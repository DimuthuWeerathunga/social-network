import { getJwtKey } from '@dw-sn/common';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../util/prisma-client';

interface Signin {
  (): string[];
  (id: string, email: string): string[];
}

declare global {
  var signin: Signin;
}

beforeAll(async () => {
  try {
    await prismaClient.$connect();
    // await prismaClient.postLike.deleteMany();
    // await prismaClient.post.deleteMany();
    // await prismaClient.topic.deleteMany();
  } catch (e) {
    throw new Error('Failed to connect to db');
  }
});

beforeEach(async () => {
  // await prismaClient.postLike.deleteMany();
  // await prismaClient.post.deleteMany();
  // await prismaClient.topic.deleteMany();
});

afterAll(async () => {
  // await prismaClient.postLike.deleteMany();
  // await prismaClient.post.deleteMany();
  // await prismaClient.topic.deleteMany();
  await prismaClient.$disconnect();
});

global.signin = (id?: string, email?: string) => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: id || '1',
    email: email || 'john@gmail.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, getJwtKey());

  // Build session Object. { jwt: MY_JWT }
  const session = { token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};