/*

{start: '7 October 2013', end: '9 October 2013', expected: 1},
{start: '5 October 2013', end: '14 October 2013', expected: 5},
{start: '7 October 2013', end: '1 January 2014',  expected:61},
{start: '7 October 2013', end: '5 October 2013', expected: 0},


*/

import reduceByDay from './reduceByDay';

const cases = [
  {start: '7 October 2013', end: '9 October 2013', expected: 1},
  {start: '5 October 2013', end: '14 October 2013', expected: 5},
  {start: '7 October 2013', end: '1 January 2014',  expected:61},
  {start: '7 October 2013', end: '5 October 2013', expected: 0},
]

const run = (target) => cases.map(({start, end, expected}) => {
  const result = target(new Date(start), new Date(end));
  
  return { result, expected, pass: result === expected};
});


WeekdaysBetweenTwoDatesByReducer = (firstDate, secondDate) => {
  // date.getDay() returns 0 for Sunday, 1 for Monday, 5 for Friday, 6 for Saturday,
  return reduceByDay(firstDate, secondDate, (count, dayDate) => {
    const dayNum = dayDate.getDay();

    return count + ((dayNum !== 0 && dayNum !== 6) ? 1 : 0);
  }, 0);
}