import {describe, expect, test} from '@jest/globals';

import BusinessDayCounter from './BusinessDayCounter';
import publicHolidays from './publicHolidays';

const counter = new BusinessDayCounter();

describe('Task One: Weekdays Between Two Dates', () => {
  const inputsAndExpectedResults = [
    {start: '7 October 2013', end: '9 October 2013', expected: 1},
    {start: '5 October 2013', end: '14 October 2013', expected: 5},
    {start: '7 October 2013', end: '1 January 2014',  expected:61},
    {start: '7 October 2013', end: '5 October 2013', expected: 0},
    {start: '7 October 2013', end: '5 October 2033', expected: 5216},
    {start: '7 October 1983', end: '5 October 2073', expected: 23478},
  ];

  inputsAndExpectedResults.forEach(({ start, end, expected}) => {
    test(`Given ${start} and ${end}, returns ${expected}`, () => {
      expect(counter.WeekdaysBetweenTwoDates(
        new Date(start),
        new Date(end)
      )).toBe(expected);
    })
  });
});

describe('Task Two: Business Days Between Two Dates', () => {
  const inputsAndExpectedResults = [
    {start: '7 October 2013', end: '9 October 2013', expected: 1},
    {start: '24 December 2013', end: '27 December 2013', expected: 0},
    {start: '7 October 2013', end: '1 January 2014', expected: 59},
  ];
  
  const publicHolidayStrings = [
    '25 December 2013', '26 December 2013', '1 January 2014',
  ];

  inputsAndExpectedResults.forEach(({ start, end, expected}) => {
    test(`Given ${start} and ${end} (and public holidays of [${publicHolidayStrings.join(', ')}]) returns ${expected}`, () => {
      expect(counter.BusinessDaysBetweenTwoDates(
        new Date(start),
        new Date(end),
        publicHolidayStrings.map(ph => new Date(ph))
      )).toBe(expected);
    })
  });
});

describe('Task Three: More Holidays', () => {
  const inputsAndExpectedResults = [
    {start: '7 October 2013', end: '9 October 2013', expected: 1},
    {start: '24 December 2013', end: '27 December 2013', expected: 1},
    {start: '7 October 2013', end: '2 January 2014', expected: 60},
  ];


  inputsAndExpectedResults.forEach(({ start, end, expected}) => {
    test(`Given ${start} and ${end} (and public holidays of [${publicHolidays.join(', ')}]) returns ${expected}`, () => {
      expect(counter.BusinessDaysBetweenTwoDates(
        new Date(start),
        new Date(end),
        publicHolidays,
      )).toBe(expected);
    })
  });
});