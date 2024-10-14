

import { bench, run, summary } from 'mitata';

function buildPeopleList(size) {
  const people = [];
  while (size--) {
    people.push({
      name: 'John',
      surname: 'Doe',
      birthYear: 1990,
      addresses: [{
        street: '123 main street',
        city: 'London',
        country: 'United Kingdom',
      }, {
        street: '123 second street',
        city: 'Paris',
        country: 'France'
      }]
    });
  }
  console.log('buildPeopleList completed')
  return people;
}

function testFnSpreadOperator (people) {
  const result = [];
  for (let i = 0; i < people.length; i++) {
    result.push({...people[i]});
  }
  return result;
}

function testFnObjectAssign (people) {
  const result = [];
  for (let i = 0; i < people.length; i++) {
    result.push(Object.assign({}, people[i]));
  }
  return result;
}

function testFnClone (people) {
  const result = [];
  for (let i = 0; i < people.length; i++) {
    result.push(structuredClone(people[i]));
  }
  return result;
}

const size = 10e4;
const people = buildPeopleList(size);

summary(() => {
  bench(`testFnSpreadOperator()`, () => testFnSpreadOperator(people));
  bench(`testFnObjectAssign()`, () => testFnObjectAssign(people));
  bench(`testFnClone()`, () => testFnClone(people));
});

await run();