import { bench, run, summary } from 'mitata';

function buildArray(size) {
  const array = [];
  while (size--) {
    array.push(size);
  }
  return array;
}

function testFnAt (array) {
  let size = array.length;
  while (size--) {
    const item = array.at(size);
  }
}

function testFnIndex (array) {
  let size = array.length;
  while (size--) {
    const item = array[size];
  }
}

const size = 10e4;
const array = buildArray(size);

summary(() => {
  bench(`testFnAt()`, () => testFnAt(array));
  bench(`testFnIndex()`, () => testFnIndex(array));
});

await run();