const newYearsDay: PublicHoliday = new PublicHoliday({
  adjustmentRule: new NextMondayIfWeekend({
   day: 1, 
   month: 0 // January
  })
});

const anzacDay: PublicHoliday = new PublicHoliday({
  day: 25, month: 3 //April
});

const queensBday: PublicHoliday = new PublicHoliday({
  adjustmentRule: new NthDayOfTheMonth({
    // Second Monday in June
   dayOfWeek: 1, // Monday
   month: 5, // June
   ordinal: 2,
  })
});

const xmasDay: PublicHoliday = new PublicHoliday({
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