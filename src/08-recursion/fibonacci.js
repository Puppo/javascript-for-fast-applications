export function fibonacci(num) {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

export function fibonacciFast(num){
  let a = 1, b = 0;

  while (num-- >= 0)
    [a, b] = [a + b, a];

  return b;
}