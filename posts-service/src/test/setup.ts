import { app } from '../app';
import { prismaClient } from '../util/prisma-client';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  var getCookie: () => string[];
  var addTopic: (cookie: string[]) => Promise<number>;
}

beforeAll(async () => {
  try {
    await prismaClient.$connect();
  } catch (e) {
    throw new Error('Failed to connect to db');
  }
});

beforeEach(async () => {});

afterAll(async () => {});

global.getCookie = () => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: 1,
    email: 'john@gmail.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};

global.addTopic = async (cookie: string[]) => {
  // call the add topic endpoint
  const response = await request(app)
    .post('/api/posts/topics')
    .set('Cookie', cookie)
    .send()
    .expect(201);

  return response.body.id;
};
