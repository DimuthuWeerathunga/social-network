import { prismaClient } from '../util/prisma-client';

interface GetCookie {
  (): Promise<string[]>;
  (name: string, email: string): Promise<string[]>;
}

declare global {
  var getCookie: GetCookie;
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
