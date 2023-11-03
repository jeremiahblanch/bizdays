import incrementTime from './incrementTime';
import isWeekend from './isWeekend';
import makeMidnightMs from './makeMidnightMs';
import oneDayMs from './oneDayMs';

class BusinessDayCounter {

  private countWeekdaysBetween(start: Date, end: Date, exclusions: Date[] = []) {
    if (start >= end) {
      return 0;
    }
  
    // To make things easier, we will deal with all dates internally as numeric values of milliseconds, at midnight on that day.
    // the function makeMidnightMs takes a date and returns a number which is the number of milliseconds since the unix epoch
    // upto midnight on that date
  
    const exclusionsMs = exclusions.map(makeMidnightMs); // the excluded dates as millisecond values
    
    return incrementTime(
      makeMidnightMs(start), // the start date as milliseconds
      makeMidnightMs(end), // the end date as milliseconds
      oneDayMs, // interval to increment - one day (24 hours) in milliseconds
      (count, currentMomentMs) => { // reducer function to run for each currentMomentMs
        const date = new Date(currentMomentMs);
        if (isWeekend(date) || exclusionsMs.includes(currentMomentMs)) {
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
  