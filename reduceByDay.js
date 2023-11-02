// given a startDate, endDate, and a reducer function,
//runs that reducer for each day between startDate and endDate excluding the start and end
import oneDayMs from './oneDayMs';

const reduceByDay = (startDate, endDate, reducer, initValue) => {
  const startDateMs = Number(startDate);
  const endDateMs = Number(endDate);

  let arr = [];
  // if dates are less than one day apart
  // or end is before start
  if ((startDateMs + oneDayMs) < endDateMs) {
    arr = Array(
      // difference in milliseconds divided by milliseconds in a day gets difference in days
      // use ceil to handle fractions of days: always round up, then deduct 1 to ignore start date
      Math.ceil((endDateMs - startDateMs) / oneDayMs) - 1
      )
      .fill();
  }

  return arr.reduce((acc, curr, index) => {
    return reducer(acc, (
      new Date(startDateMs + (index + 1) * oneDayMs)
    ));
  }, initValue);
}

export default reduceByDay;