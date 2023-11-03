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
}