import { bench, run, summary } from 'mitata';

function buildArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}

function buildSet(size) {
  const set = new Set();
  for (let i = size; i > 0; i--) {
    set.add(i);
  }
  return set;
}

function testFnArraySome (array, iterations) {
  while (iterations--) {
    array.some(x => x === iterations % 2);
  }
}

function testFnArrayIncludes (array, iterations) {
  while (iterations--) {
    array.includes(iterations % 2);
  }
}

function testFnSet (set, iterations) {
  while (iterations--) {
    set.has(iterations % 2);
  }
}

const size = 10e3;
const array = buildArray(size);
const set = buildSet(size);

summary(() => {
  bench(`testFnArraySome(${size})`, () => testFnArraySome(array, size));
  bench(`testFnArrayIncludes(${size})`, () => testFnArrayIncludes(array, size));
  bench(`testFnSet(${size})`, () => testFnSet(set, size));
});

await run();