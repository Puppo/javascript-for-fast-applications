import { bench, run, summary } from 'mitata';

function buildObject(size) {
  const obj = {};
  while (size--) {
    const key = size % 2 === 0 ? size : size.toString();
    obj[key] = key;
  }
  return obj;
}

function buildMap(size) {
  const map = new Map();
  while (size--) {
    const key = size % 2 === 0 ? size : size.toString();
    map.set(key, key);
  }
  return map;
}

function testFnObject (obj, size) {
  while (size--) {
    const key = size % 2 === 0 ? size : size.toString();
    obj.hasOwnProperty(key);
  }
}

function testFnMap (map, size) {
  while (size--) {
    const key = size % 2 === 0 ? size : size.toString();
    map.has(key);
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