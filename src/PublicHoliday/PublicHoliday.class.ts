import { IPublicHolidayAdjustmentRule } from './PublicHolidayAdjustmentRules';

type PublicHolidayArgs = {
  adjustmentRule?: IPublicHolidayAdjustmentRule,
  day?: number,
  month?: number,
  name: string,
}

/**
 * A class for defining a Public Holiday that can have either a fixed day and month, or an adjustmentRule for 
 * deriving what its date will be on different years
 */
class PublicHoliday {
  constructor({
    adjustmentRule,
    day,
    month,
    name,
  }: PublicHolidayArgs) {
    if (!adjustmentRule && (
      !day ||
      (month ?? -1) < 0) // month === 0 is acceptable
    ) {
      throw new Error('Invalid public holiday. Month and day must be set if no adjustment rule is specified.')
    }
    
    this.name = name;
    this.day = day;
    this.month = month; // January is 0
    this.adjustmentRule = adjustmentRule;
  }

  adjustmentRule?: IPublicHolidayAdjustmentRule
  day?: number
  month?: number
  name: string
  
  /**
   * Get the date of this public holiday for the given year
   * @param {number} year
   * @return {Date}
   */
  getDateForYear(year: number): Date {
    if (this.adjustmentRule) {  
      return this.adjustmentRule.adjustForYear(year)
    }

    return new Date(year, this.month ?? 0, this.day);
  }
  
  /**
   * Given a start and end date, return the dates of this public holiday,
   * that will occur between those dates. eg eg it might not occurr at all,
   * or it might occur multiple times if those dates span multiple years
   * @param {Date} start - start date
   * @param {Date} end - end date
   * @return {Date[]} an array of dates of instances of this public holiday between start and end
   */
  getDatesBetween(start: Date, end: Date): Date[] {
    const endYear = end.getFullYear();
    const dates: Date[] = [];

    for (let year = start.getFullYear() - 1; year++ <= endYear;) { // faster for loop with increment within the conditional
      const dateForThisYear = this.getDateForYear(year);

      if (dateForThisYear > start && dateForThisYear < end) {
        dates.push(dateForThisYear);
      }
    }
    
    return dates;
  }

  toString() {
    return this.name;
  }
}

export default PublicHoliday;