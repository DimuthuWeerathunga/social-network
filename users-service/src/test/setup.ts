import { app } from '../app';
import { prismaClient } from '../util/prisma-client';
import request from 'supertest';

declare global {
  var getCookie: () => Promise<string[]>;
}

beforeAll(async () => {
  try {
    await prismaClient.$connect();
  } catch (e) {
    throw new Error('Failed to connect to db');
  }
});

beforeEach(async () => {
  await prismaClient.followers.deleteMany();
  await prismaClient.users.deleteMany();
});

afterAll(async () => {
  await prismaClient.followers.deleteMany();
  await prismaClient.users.deleteMany();
  await prismaClient.$disconnect();
});

global.getCookie = async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
