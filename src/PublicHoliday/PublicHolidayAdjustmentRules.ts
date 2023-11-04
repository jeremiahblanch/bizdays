export interface IPublicHolidayAdjustmentRule {
  adjustForYear(year: number): Date
}

type NextMondayIfWeekendParams = {
  day: number,
  month: number,
}

/**
 * A class for Public Holidays that will move to the following Monday if they occur on a weekend.
 */
class NextMondayIfWeekend implements IPublicHolidayAdjustmentRule {
  constructor({ day, month, }: NextMondayIfWeekendParams) {
    this.day = day;
    this.month = month; // January is 0
  }

  day: number = 0
  month: number = -1

  adjustForYear(year: number) {
    const workingDate = new Date(0);

    workingDate.setFullYear(year, this.month, this.day);
    
    let dayOfWeek =  workingDate.getDay();
    
    if (dayOfWeek === 0) { // Sunday
      workingDate.setDate(this.day + 1);
    }
    else if (dayOfWeek === 6) { // Saturday
      workingDate.setDate(this.day + 2);
    }

    return workingDate; 
  }
}

type NthDayOfTheMonthParams = {
  dayOfWeek: number, // Sunday is 0, Monday is 1, Saturday is 6
  month: number, // January is 0
  ordinal: number, // 1 is for first, 2 is 2nd etc
}

/**
 * A class for Public Holidays that occur on the Nth day of a particular month each year,
 * eg Queen's Birthday on the 2nd Monday of June.
 */
class NthDayOfTheMonth implements IPublicHolidayAdjustmentRule {
  constructor({ dayOfWeek, month, ordinal }: NthDayOfTheMonthParams ) {
    this.dayOfWeek = dayOfWeek;
    this.month = month;
    this.ordinal = ordinal;
  }

  dayOfWeek: number = 0
  month: number = -1
  ordinal: number = 0

  adjustForYear(year: number) {
    const workingDate = new Date(year, this.month, 1); // start at first day of the month
    let dayOfWeek = workingDate.getDay();
    let count = 0;

    while (
      (dayOfWeek !== this.dayOfWeek) || (count < this.ordinal)
    ) {
      let offset = this.dayOfWeek - dayOfWeek;

      if (offset <= 0) {
        offset = 7 + offset;
      }
      workingDate.setDate(workingDate.getDate() + offset);
      count ++;
      dayOfWeek =  workingDate.getDay();
    }

    return workingDate;
  }
};

export { NthDayOfTheMonth, NextMondayIfWeekend};