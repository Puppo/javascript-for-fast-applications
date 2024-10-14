

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

function testFnSpreadOperatorIntoReducer (people) {
  return people.reduce((acc, person) => ([
    ...acc,
    {...person}
  ]), [])
}

function testFnConcat (people) {
  return people.reduce((acc, person) => acc.concat([{...person}]), [])
}

function testFnPushMethod (people) {
  return people.reduce((acc, person) => {
    acc.push({...person});
    return acc;
  }, [])
}

const size = 10e3;
const people = buildPeopleList(size);

summary(() => {
  bench(`testFnSpreadOperatorIntoReducer()`, () => testFnSpreadOperatorIntoReducer(people));
  bench(`testFnConcat()`, () => testFnConcat(people));
  bench(`testFnPushMethod()`, () => testFnPushMethod(people));
});

await run();