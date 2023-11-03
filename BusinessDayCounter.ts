import incrementTime from './incrementTime';
import makeMidnightMs from './makeMidnightMs';
import oneDayMs from './oneDayMs';

class BusinessDayCounter {
  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date) {
    return incrementTime(
      makeMidnightMs(firstDate),
      makeMidnightMs(secondDate),
      oneDayMs,
      (count, currMs) => {
        const dayOfWeek = (new Date(currMs)).getDay();
        
        // return count and add 1 if dayOfWeek is 0 - Sunday or 6 - Saturday
        return count + ((dayOfWeek !== 0 && dayOfWeek !== 6) ? 1 : 0);
    }, 0);
  }
  
  BusinessDaysBetweenTwoDates_Simple(
  firstDate: Date,
  secondDate: Date,
  publicHolidays: [Date],
  ) {
    const publicHolidayMidnights = publicHolidays.map(makeMidnightMs);

  }
  
  BusinessDaysBetweenTwoDates_Complex(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: [PublicHoliday],
    ) {

      // we have to work out the year of each of these
      // is each holiday within the time period given and then work out the year
      const publicHolidayMidnights = publicHolidays.map(makeMidnightMs);
  
    }
  