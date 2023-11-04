type IncrementTimeReducer = (acc: any, curr: number) => any;

/**
 * Runs a given reducer function repeatedly on moments of time.
 * @param {number} startMs - start time in milliseconds
 * @param {number} endMs - end time in milliseconds
 * @param {number} incrementAmountMs - amount of milliseconds to increment each time
 * @param {IncrementTimeReducer} reducer - a reducer function that will be passed the previous result of the reducer and the current moment in milliseconds
 * @param {any} initialValue - initial value
 * 
 */
const incrementTime = (
  startMs: number,
  endMs: number,
  incrementAmountMs: number,
  reducer: IncrementTimeReducer,
  initialValue: any
) => {
  let curr = startMs + incrementAmountMs;
  let acc = initialValue;

  while (curr < endMs) {
    acc = reducer(acc, curr);
    curr += incrementAmountMs;
  }

  return acc;
}

export default incrementTime;