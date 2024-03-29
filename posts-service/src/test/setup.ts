import { app } from '../app';
import { prismaClient } from '../util/prisma-client';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { getJwtKey } from '@dw-sn/common';

interface Signin {
  (): string[];
  (id: string, email: string): string[];
}

declare global {
  var signin: Signin;
  var addTopic: () => Promise<string>;
  var createExamplePost: (topicId: string, cookie: string[]) => Promise<String>;
}

beforeAll(async () => {
  try {
    await prismaClient.$connect();
    await prismaClient.postLike.deleteMany();
    await prismaClient.post.deleteMany();
    await prismaClient.topic.deleteMany();
  } catch (e) {
    throw new Error('Failed to connect to db');
  }
});

beforeEach(async () => {
  await prismaClient.postLike.deleteMany();
  await prismaClient.post.deleteMany();
  await prismaClient.topic.deleteMany();
});

afterAll(async () => {
  await prismaClient.postLike.deleteMany();
  await prismaClient.post.deleteMany();
  await prismaClient.topic.deleteMany();
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

global.addTopic = async () => {
  // call the add topic endpoint
  const response = await request(app)
    .post('/api/posts/topics')
    .send({ id: '1', title: 'Test topic' })
    .expect(201);

  return response.body.id;
};

global.createExamplePost = async (topicId, cookie) => {
  const title = 'Test title';
  const content = 'Test content';
  const imageUrls = [
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
  ];
  const response = await request(app)
    .post('/api/posts')
    .set('Cookie', cookie)
    .send({
      topicId,
      title,
      content,
      imageUrls,
    });
  return response.body.id;
};
