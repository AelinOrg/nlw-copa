import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';
import cors from '@fastify/cors';

const client = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  const count = await client.pool.count();

  fastify.get('/pools/count', async () => {
    return { count };
  });

  await fastify.listen({ port: 8090 /*host: '0.0.0.0'*/ });
}

bootstrap();
