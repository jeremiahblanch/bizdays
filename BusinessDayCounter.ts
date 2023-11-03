import incrementTime from './incrementTime';
import isWeekend from './isWeekend';
import makeMidnightMs from './makeMidnightMs';
import oneDayMs from './oneDayMs';

class BusinessDayCounter {

  private countWeekdaysBetween(startMs: number, endMs: number, exclusions: number[] = []) {
    return incrementTime(
      startMs,
      endMs,
      oneDayMs,
      (count, currMs) => {
        const date = new Date(currMs);
        if (isWeekend(date) || exclusions.includes(currMs)) {
          return count;
        }
        
        return count + 1;
    }, 0);
  }

  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date) {
    return this.countWeekdaysBetween(
      makeMidnightMs(firstDate),
      makeMidnightMs(secondDate));
  }
  
  BusinessDaysBetweenTwoDates_Simple(
  firstDate: Date,
  secondDate: Date,
  publicHolidays: [Date],
  ) {
    return this.countWeekdaysBetween(
      makeMidnightMs(firstDate),
      makeMidnightMs(secondDate),
      publicHolidays.map(makeMidnightMs));
  }
  
  BusinessDaysBetweenTwoDates_Complex(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: [PublicHoliday],
    ) {
      // we have to work out the year of each of these
      // is each holiday within the time period given and then work out the year
      const publicHolidayMidnights = publicHolidays
        .map(ph => ph.getDatesBetween(firstDate, secondDate))
        .flat()
        .map(makeMidnightMs);
  
      return this.countWeekdaysBetween(
          makeMidnightMs(firstDate),
          makeMidnightMs(secondDate),
          publicHolidayMidnights);
    }
  }
  