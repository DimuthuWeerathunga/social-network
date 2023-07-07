import { prismaClient } from '../util/prisma-client';

declare global {
  var getCookie: () => Promise<string[]>;
  var addTopic: () => Promise<number>;
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

global.addTopic = async () => {
  // call the add topic endpoint
};
