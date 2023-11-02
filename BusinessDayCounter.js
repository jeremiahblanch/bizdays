import allDaysBetween from './allDaysBetween';
class BusinessDayCounter {
  WeekdaysBetweenTwoDates(firstDate, secondDate) {
    // date.getDay() returns 0 for Sunday, 1 for Monday, 5 for Friday, 6 for Saturday,
    return allDaysBetween(firstDate, secondDate).reduce((count, dayDate) => {
      const dayNum = dayDate.getDay();

      return count + ((dayNum !== 0 && dayNum !== 6) ? 1 : 0);
    }, 0);
  }

  
  BusinessDaysBetweenTwoDates(
  firstDate,
  secondDate,
  publicHolidays,
  ) {
  // todo
  }
  }