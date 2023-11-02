import allDaysBetween from './allDaysBetween';
class BusinessDayCounter {
  WeekdaysBetweenTwoDates(firstDate, secondDate) {
    // date.getDay() returns 1 for Monday, 5 for Friday, 6 for Saturday, 7 for Sunday etc
    return allDaysBetween(firstDate, secondDate).reduce((count, dayDate) => count + (dayDate.getDay() <= 5 ? 1 : 0), 0);
  }
  BusinessDaysBetweenTwoDates(
  firstDate,
  secondDate,
  publicHolidays,
  ) {
  // todo
  }
  }