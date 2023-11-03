import incrementTime from './incrementTime';
import isWeekend from './isWeekend';
import makeMidnightMs from './makeMidnightMs';
import oneDayMs from './oneDayMs';

class BusinessDayCounter {

  private countWeekdaysBetween(start: Date, end: Date, exclusions: Date[] = []) {
    if (start >= end) {
      return 0;
    }
  
    const exclusionsMs = exclusions.map(makeMidnightMs);
    
    return incrementTime(
      makeMidnightMs(start),
      makeMidnightMs(end),
      oneDayMs,
      (count, currMs) => {
        const date = new Date(currMs);
        if (isWeekend(date) || exclusionsMs.includes(currMs)) {
          return count;
        }
        
        return count + 1;
    }, 0);
  }

  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date) {
    return this.countWeekdaysBetween(firstDate, secondDate);
  }
  
  BusinessDaysBetweenTwoDates_Simple(
  firstDate: Date,
  secondDate: Date,
  publicHolidays: [Date],
  ) {
    return this.countWeekdaysBetween(firstDate, secondDate, publicHolidays);
  }
  
  BusinessDaysBetweenTwoDates_Complex(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: [PublicHoliday],
  ) {
      // we have to work out the year of each of these
      // is each holiday within the time period given and then work out the year
      const publicHolidayDates = publicHolidays
        .map(ph => ph.getDatesBetween(firstDate, secondDate))
        .flat();
  
      return this.countWeekdaysBetween(firstDate, secondDate, publicHolidayDates);
    }
  }
  