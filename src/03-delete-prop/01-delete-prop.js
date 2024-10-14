import { bench, run, summary } from 'mitata';

class Person {
  constructor(name, surname, birthYear) {
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
  }
}

function testFnDeleteProp (size) {
  const result = [];
  while (size--) {
    const p = new Person('John', 'Doe', 1990);
    delete p.birthYear;
    result.push(p);
  }
  return result;
}

function testFnCreateNewObject (size) {
  const result = [];
  while (size--) {
    const p = new Person('John', 'Doe', 1990);
    result.push({
      name: p.name,
      surname: p.surname,
    });
  }
}

const size = 10e6;

summary(() => {
  bench(`testFnDeleteProp(${size})`, () => testFnDeleteProp(size));
  bench(`testFnCreateNewObject(${size})`, () => testFnCreateNewObject(size));
});

await run();