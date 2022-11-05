import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: faker.lorem.sentence(),
      code: faker.random.alphaNumeric(6),
      ownerId: user.id,

      // This is a relation between the pool and the user
      // Prisma allows you to create a relation between two models
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: faker.date.past(1),
      firstTeamCountryCode: faker.address.countryCode(),
      secondTeamCountryCode: faker.address.countryCode(),
    },
  });

  await prisma.game.create({
    data: {
      date: faker.date.past(1),
      firstTeamCountryCode: faker.address.countryCode(),
      secondTeamCountryCode: faker.address.countryCode(),

      guesses: {
        create: {
          firstTeamPoints: Number(
            faker.random.numeric(1, {
              bannedDigits: ['5', '6', '7', '8', '9'],
            }),
          ),
          secondTeamPoints: Number(
            faker.random.numeric(1, {
              bannedDigits: ['5', '6', '7', '8', '9'],
            }),
          ),

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
