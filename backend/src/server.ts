import { PrismaClient } from '@prisma/client';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

const app = Fastify({
  logger: true,
});

const client = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

async function bootstrap() {
  setup(PoolsController, GuessesController, UsersController);
}

async function setup(...controllers: (() => void)[]) {
  await app.register(cors, {
    origin: true,
  });

  controllers.forEach(controller => controller());

  await app.listen({ port: 8090, host: '0.0.0.0' });
}

function PoolsController() {
  // Contagem de palpites
  app.get('/pools/count', async () => {
    const count = await client.pool.count();

    return { count };
  });

  // Criação de palpites
  app.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    console.log(
      '🚀 ~ file: server.ts ~ line 44 ~ app.post ~ request.body',
      request.body,
    );
    const { title } = createPoolBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await client.pool.create({
      data: {
        title,
        code,
      },
    });

    return reply.code(201).send({ code });
  });
}

function GuessesController() {
  // Contagem de palpites
  app.get('/guesses/count', async () => {
    const count = await client.guess.count();

    return { count };
  });
}

function UsersController() {
  // Contagem de usuários
  app.get('/users/count', async () => {
    const count = await client.user.count();

    return { count };
  });
}

bootstrap();
