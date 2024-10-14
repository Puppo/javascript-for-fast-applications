import { bench, run, summary } from 'mitata';

function makeSayHelloWithInsideClass(name) {
  class HelloInside {
    constructor(name) {
      this.name = name;
    }
  
    sayHello() {
      return `Hello ${this.name}`
    }
  }

  return new HelloInside(name);
}

class Hello {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello ${this.name}`
  }
}

function makeSayHelloWithOutsideClass(name) {
  return new Hello(name);
}

function testFn(size, fn) {
  while (size--) {
    fn('world');
  }
}

const size = 10e4;

summary(() => {
  bench(`makeSayHelloWithInsideClass(${size})`, () => {
    testFn(size, makeSayHelloWithInsideClass);
  });

  bench(`makeSayHelloWithOutsideClass(${size})`, () => {
    testFn(size, makeSayHelloWithOutsideClass);
  });
});

await run();

