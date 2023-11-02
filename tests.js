/*

{start: '7 October 2013', end: '9 October 2013', expected: 1},
{start: '5 October 2013', end: '14 October 2013', expected: 5},
{start: '7 October 2013', end: '1 January 2014',  expected:61},
{start: '7 October 2013', end: '5 October 2013', expected: 0},


*/

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