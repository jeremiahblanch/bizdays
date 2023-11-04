import incrementTime from '../utils/incrementTime';
import isWeekend from '../utils/isWeekend';
import makeMidnightMs from '../utils/makeMidnightMs';
import oneDayMs from '../constants/oneDayMs';
import PublicHoliday from '../PublicHoliday/PublicHoliday.class';

class BusinessDayCounter {

  /**
   * Count the Weekdays between the given start and end dates, but exclude any dates within the optional array exclusions
   * @param {Date} start - the start date
   * @param {Date} end - the end date
   * @param {Date[]} exclusions - dates to exclude from the count
   * @return {number}
   */
  private countWeekdaysBetween(start: Date, end: Date, exclusions: Date[] = []) {
    if (start >= end) {
      return 0;
    }
  
    // To make things easier, we will deal with all dates internally as numeric values of milliseconds, at midnight on that day.
    // The function makeMidnightMs takes a date and returns a number which is the number of milliseconds since the unix epoch
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

    /* 
      Instead of incrementTime, we could also use the third party library date-fns (https://date-fns.org/)
      In that case we would do something like this
      return dateFns.differenceInBusinessDays(end, start) - [...exclusions, start].filter(d => !dateFns.isWeekend(d) && dateFns.isWithinInterval(d, { start, end })).length;
    */
  }


  /**
   * Counts the number of non-weekend days between the two given dates, excluding the edge dates.
   * @param {Date} firstDate - the start date of the period
   * @param {Date} secondDate - the end date of the period
   * @return {number}
   */
  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date) {
    return this.countWeekdaysBetween(firstDate, secondDate);
  }
  
  /**
   * Counts the number of business days between the two given dates, excluding the edge dates, and
   * taking into consideration the supplied array of public holidays
   * @param {Date} firstDate - the start date of the period
   * @param {Date} secondDate - the end date of the period
   * @param {(Date | PublicHoliday)[]} publicHolidays - an array of either Dates or instances of the class PublicHoliday 
   * @return {number}
   */
  BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: (Date | PublicHoliday)[],
  ) {
      // publicHolidays could be an array of dates or an array of PublicHoliday objects
      // If it is publicHoliday objects, we have use them to work out what the date(s) would be.
      // Note: the publicHoliday may not happen between the given dates, or it could happen multiple times
      const publicHolidayDates = publicHolidays
        .map((ph) => ph instanceof PublicHoliday ? ph.getDatesBetween(firstDate, secondDate) : ph)
        // ph.getDatesBetween will return an array, so we need to flatten
        .flat();
  
      return this.countWeekdaysBetween(firstDate, secondDate, publicHolidayDates);
    }
  }

  export default BusinessDayCounter;
  