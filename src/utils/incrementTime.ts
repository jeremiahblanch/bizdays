type IncrementTimeReducer = (acc: any, curr: number) => any;

/**
 * Runs a given reducer function repeatedly on moments of time and returns the final result.
 * @param {number} startMs - start time in milliseconds
 * @param {number} endMs - end time in milliseconds
 * @param {number} incrementAmountMs - amount of milliseconds to increment each time
 * @param {IncrementTimeReducer} reducer - a reducer function that will be passed the previous
 * result of the reducer and the current moment in milliseconds, and should return a new result
 * that will be passed to the next iteration
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
  let currentMomentMs = startMs + incrementAmountMs;
  let acc = initialValue;

  while (currentMomentMs < endMs) {
    acc = reducer(acc, currentMomentMs);
    currentMomentMs += incrementAmountMs;
  }

  return acc;
}

export default incrementTime;