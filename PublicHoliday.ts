type PublicHolidayArgs = {
  adjustmentRule?: IPublicHolidayAdjustmentRule,
  day?: number,
  month?: number,
}

class PublicHoliday {
  constructor({
    day,
    month,
    adjustmentRule,
  }: PublicHolidayArgs) {
    if (!adjustmentRule && (
      !day ||
      (month ?? -1) < 0) // month === 0 is acceptable
    ) {
      throw new Error('Invalid public holiday. Month and day must be set if no adjustment rule is specified.')
    }
    
    this.day = day;
    this.month = month; // January is 0
    this.adjustmentRule = adjustmentRule;
  }

  adjustmentRule?: IPublicHolidayAdjustmentRule
  day?: number
  month?: number
  
  getDateForYear(year: number): Date {
    if (this.adjustmentRule) {  
      return this.adjustmentRule.adjustForYear(year)
    }

    return new Date(year, this.month ?? 0, this.day);
  }

  // given a start and end date, return the dates of this public holiday 
  // that will occur between those dates
  // eg it might not occurr at all, or it might occur multiple times if those dates span
  // multiple years
  getDatesBetween(start: Date, end: Date): Date[] {
    const endYear = end.getFullYear();
    const dates: Date[] = [];

    for (let year = start.getFullYear(); year++; year < endYear) {
      const dateForThisYear = this.getDateForYear(year);

      if (dateForThisYear > start && dateForThisYear < end) {
        dates.push(dateForThisYear);
      }
    }
    
    return dates;
  }
}

export default PublicHoliday;