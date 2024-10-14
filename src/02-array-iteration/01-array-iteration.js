import { bench, run, summary } from 'mitata';

class Person {
  constructor(name, surname, birthYear) {
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
  }
}

const buildPeopleList = (length) => {
  const people = [];
  while (length--) {
    people.push(new Person('John', 'Doe', 1990));
  }
  return people;
}

function testFnReduceWithConcat (people) {
  return people.reduce((r, p) => {
    return r.concat([{
      name: p.name,
      surname: p.surname,
    }])
  }, []);
}

function testFnReduceWithPush (people) {
  return people.reduce((r, p) => {
    r.push({
      name: p.name,
      surname: p.surname,
    });
    return r;
  }, []);
}

function testFnForOf (people) {
  const result = [];
  for (const p of people) {
    result.push({
      name: p.name,
      surname: p.surname,
    });
  }
  return result;
}

function testFnFor (people) {
  const result = [], length = people.length;
  for (let i = 0; i < length; i++) {
    const { name, surname } = people[i];
    result.push({
      name,
      surname,
    });
  }
  return result;
}

const size = 10e3;
const peopleList = buildPeopleList(size);

summary(() => {
  bench(`testFnReduceWithConcat(${size})`, () => testFnReduceWithConcat(peopleList));
  bench(`testFnReduceWithPush(${size})`, () => testFnReduceWithPush(peopleList));
  bench(`testFnForOf(${size})`, () => testFnForOf(peopleList));
  bench(`testFnFor(${size})`, () => testFnFor(peopleList));
});

await run();