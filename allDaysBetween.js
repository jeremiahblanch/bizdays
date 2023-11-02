// returns an array of date objects - one object for each day between the given 2 dates, excluding the start and end
import oneDayMs from './oneDayMs';

const allDaysBetween = (startDate, endDate) => {
  const startDateMs = Number(startDate);
  const endDateMs = Number(endDate);

  // if dates are less than one day apart
  // or end is before start
  if ((startDateMs + oneDayMs) >= endDateMs) {

    console.log('dates not far enough apart');
    return [];
  }

  return Array(
    // difference in milliseconds divided by milliseconds in a day gets difference in days
    // use ceil to handle fractions of days: always round up, then deduct 1 to ignore start date
    Math.ceil((endDateMs - startDateMs) / oneDayMs) - 1
    )
    .fill()
    // because we don't want to include start and end dates, start at index + 1
    .map((_, index) => new Date(startDateMs + (index + 1) * oneDayMs));
};

export default allDaysBetween;