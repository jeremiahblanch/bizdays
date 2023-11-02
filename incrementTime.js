// given a start and end value in milliseconds, startMs, endMs,
// an amount to increment: deltaMs,
// a reducer function,
// and an intial value: initValue
// runs through every moment from startMs to endMs, stepping at intervals of deltaMs, and running 
// the reducer function, feeding the result into the next run of the reducer.
const incrementTime = (startMs, endMs, deltaMs, reducer, initValue) => {
  let curr = startMs + deltaMs;
  let acc = initValue;

  while (curr < endMs) {
    acc = reducer(acc, curr);
    curr += deltaMs;
  }

  return acc;
}

export default incrementTime;