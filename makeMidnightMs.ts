// given a date, sets the time to midnight and returns the value as a number of milliseconds from the unix epoch
const makeMidnightMs = (d: Date): number => d.setHours(0,0,0,0);

export default makeMidnightMs;