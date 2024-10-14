'use strict'

import fastify from "fastify";
import { resolve } from 'node:path';
import { Worker } from 'node:worker_threads';
import { fibonacci, fibonacciFast } from './fibonacci.js';

let requestsIds = 0
const requests = {}

const worker = new Worker(new URL('./worker.js', import.meta.url));
worker.on('message', (event) => {
  requests[event.requestId](event.result)
})
.on('error', (error) => {
  res.status(500).send({
    error
  })
})

async function build() {
  const server = fastify();
  let lastTime = Date.now();
  const intervalId = setInterval(() => {
    const now = Date.now();
    console.log(`Interval after ${now - lastTime}ms`);
    lastTime = now;
  }, 500);

  server.register(import('fastify-piscina'), {
    filename: resolve(import.meta.dirname, 'worker-piscina.js'),
  });

  server.get('/fibonacci/:n', ({params: { n }}) => {
    return fibonacci(n)
  })

  server.get('/fibonacci-worker/:n', async ({params: { n }}) => {
    const requestId = requestsIds++    
    return await new Promise((res) => {
      requests[requestId] = res
      worker.postMessage({ requestId, n })
    });
  })

  server.get('/fibonacci-worker-piscina/:n', ({params: { n }}) => {
    return server.runTask(n)
  })

  server.get('/fibonacci-fast/:n', ({params: { n }}) => {
    return fibonacciFast(n)
  })

  server.addHook('onClose', () => {
    clearInterval(intervalId);
  })

  await server.listen({
    host: '0.0.0.0',
    port: 3000
  })
}

build()