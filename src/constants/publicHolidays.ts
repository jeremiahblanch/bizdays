import PublicHoliday from '../PublicHoliday/PublicHoliday.class';
import { NextMondayIfWeekend, NthDayOfTheMonth } from '../PublicHoliday/PublicHolidayAdjustmentRules';

const newYearsDay: PublicHoliday = new PublicHoliday({
  name: 'New Years\' Day',
  adjustmentRule: new NextMondayIfWeekend({
   day: 1, 
   month: 0 // January
  })
});

const anzacDay: PublicHoliday = new PublicHoliday({
  name: 'Anzac Day',
  day: 25,
  month: 3 //April
});

const queensBday: PublicHoliday = new PublicHoliday({
  name: 'Queens Bday',
  adjustmentRule: new NthDayOfTheMonth({
    // Second Monday in June
   dayOfWeek: 1, // Monday
   month: 5, // June
   ordinal: 2,
  })
});

const xmasDay: PublicHoliday = new PublicHoliday({
  name: 'Xmas Day',
  adjustmentRule: new NextMondayIfWeekend({
    day: 25, 
    month: 11 // December
  })
});

export default [
  newYearsDay,
  anzacDay,
  queensBday,
  xmasDay,
];