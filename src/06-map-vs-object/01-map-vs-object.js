import { bench, run, summary } from 'mitata';

function buildObject(size) {
  const obj = {};
  while (size--) {
    obj[size] = size;
  }
  return obj;
}

function buildMap(size) {
  const map = new Map();
  while (size--) {
    map.set(size, size);
  }
  return map;
}

function testFnObject (obj, size) {
  while (size--) {
    obj.hasOwnProperty(size);
  }
}

function testFnMap (map, size) {
  while (size--) {
    map.has(size);
  }
}

const size = 10e4;
const obj = buildObject(size);
const map = buildMap(size);

summary(() => {
  bench(`testFnObject()`, () => testFnObject(obj, size));
  bench(`testFnMap()`, () => testFnMap(map, size));
});

await run();