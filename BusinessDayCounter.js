import { differenceInBusinessDays } from 'date-fns';
class BusinessDayCounter {

  // the ordinal number of a week day, corresponding to javascript getDay()
  // 1 is Monday, 5 is Friday
  weekDays = [1,2,3,4,5];

  WeekdaysBetweenTwoDates(firstDate, secondDate) {
    return differenceInBusinessDays(firstDate, secondDate);
  }
  BusinessDaysBetweenTwoDates(
  firstDate,
  secondDate,
  publicHolidays,
  ) {
  // todo
  }
  }