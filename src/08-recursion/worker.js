import { fibonacci } from './fibonacci.js';

import { parentPort } from 'node:worker_threads';

parentPort.on('message', ({n, requestId}) => {
  parentPort.postMessage({
    requestId,
    result: fibonacci(n)
  });
})