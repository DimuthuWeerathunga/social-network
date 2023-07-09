import { app } from '../app';
import { prismaClient } from '../util/prisma-client';
import request from 'supertest';

interface Signin {
  (): Promise<string[]>;
  (name: string, email: string): Promise<string[]>;
}

declare global {
  var signin: Signin;
}

beforeAll(async () => {
  try {
    await prismaClient.$connect();
  } catch (e) {
    throw new Error('Failed to connect to db');
  }
});

beforeEach(async () => {
  await prismaClient.follow.deleteMany();
  await prismaClient.user.deleteMany();
});

afterAll(async () => {
  await prismaClient.follow.deleteMany();
  await prismaClient.user.deleteMany();
  await prismaClient.$disconnect();
});

global.signin = async (name?: string, email?: string) => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name: name || 'John Doe',
      email: email || 'john@gmail.com',
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
