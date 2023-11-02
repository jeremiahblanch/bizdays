// given a startDate, endDate, and a reducer function,
//runs that reducer for each day between startDate and endDate excluding the start and end
import oneDayMs from './oneDayMs';

const incremententDay = (startDate, endDate, reducer, initValue) => {
  const startDateMs = Number(startDate);
  const endDateMs = Number(endDate);

  let curr = startDateMs + oneDayMs;
  let acc = initValue;

  while (curr < endDateMs) {
    acc = reducer(acc, new Date(curr));
    curr += oneDayMs;
  }

  return acc;
}

export default incremententDay;