class PublicHoliday {

  constructor({
    day,
    month,
    mondayIfWeekend,
    dayOfWeek,
    instanceOfDayOfWeekInMonth,
  }) {
    this.day = day;
    this.month = month; // Note js thinks january is 0
    this.mondayIfWeekend = mondayIfWeekend;
    this.dayOfWeek = dayOfWeek;
    this.instanceOfDayOfWeekInMonth = instanceOfDayOfWeekInMonth;

    // so we don't have to check these all multiple times
    this.fixed = !mondayIfWeekend && !dayOfWeek && !instanceOfDayOfWeekInMonth;

    // TODO might need a check for if fixed then day and month must be set
  }
  
  getDateForYear(year) {
    const workingDate = new Date(0);

    workingDate.setFullYear(year);

    if (this.month >= 0) {
      workingDate.setMonth(this.month);
    }

    if (this.day) {
      workingDate.setDate(this.day);
    }

    if (this.fixed) {  
      return workingDate;
    }

    let dayOfWeek =  workingDate.getDay();
    
    if (this.mondayIfWeekend) {
      if (dayOfWeek === 0) { // Sunday
        workingDate.setDate(this.day + 1);
      }
      else if (dayOfWeek === 6) {
        workingDate.setDate(this.day + 2);
      }

      return workingDate;
    }

    
    if (this.dayOfWeek >= 0 && this.instanceOfDayOfWeekInMonth) {
      let instanceCount = 0;

      debugger;
      while (
        (dayOfWeek !== this.dayOfWeek) || (instanceCount < this.instanceOfDayOfWeekInMonth)
      ) {
        let offset = this.dayOfWeek - dayOfWeek;
        if (offset <= 0) {
          offset = 7 + offset;
        }
        workingDate.setDate(workingDate.getDate() + offset);
        instanceCount ++;
        dayOfWeek =  workingDate.getDay();
      }

      return workingDate;

    }

  }

  

}