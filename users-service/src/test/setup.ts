import { prismaClient } from '../util/prisma-client';

beforeAll(async () => {
  console.log(process.env.DATABASE_URL);

  try {
    await prismaClient.$connect();
    console.log('connected to database');
    console.log(await prismaClient.users.findFirst());
  } catch (e) {
    throw new Error('Failed to connect to db');
  }
});

beforeEach(async () => {
  await prismaClient.users.deleteMany();
  await prismaClient.followers.deleteMany();
});

afterAll(async () => {
  await prismaClient.users.deleteMany();
  await prismaClient.followers.deleteMany();
  await prismaClient.$disconnect();
});
