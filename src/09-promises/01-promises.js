'use strict'

import fastify from "fastify";
import { promise } from './promise.js';

async function build() {
  const server = fastify();

  server.get('/promises-seq', async () => {
    const startTime = Date.now();
    await promise(1000);
    await promise(2000);
    await promise(50);
    return {
      time: `${Date.now() - startTime}ms`
    }
  })

  server.get('/promises-parallel', async() => {
    const startTime = Date.now();
    await Promise.all([
      promise(1000),
      promise(2000),
      promise(50),
    ]);
    return {
      time: `${Date.now() - startTime}ms`
    }
  })

  await server.listen({
    host: '0.0.0.0',
    port: 3000
  })
}

build()