import request from 'supertest';
import { app } from '../../../app';
import { prismaClient } from '../../../util/prisma-client';
import { User } from '@prisma/client';

it('Resturns a successful 201 on correct user follow action', async () => {
  const johnCookie = await getCookie('John Doe', 'john@gmail.com');
  const janeCookie = await getCookie('Jane Doe', 'jane@gmail.com');

  const { id: johnId } = (await prismaClient.user.findUnique({
    where: { email: 'john@gmail.com' },
    select: {
      id: true,
    },
  })) as User;

  //   jane follows john
  await request(app)
    .post('/api/users/followers')
    .set('Cookie', janeCookie)
    .send({ followeeId: +johnId.toString() })
    .expect(201);
});

it('Should not allow a user to follow himself', async () => {
  const johnCookie = await getCookie('John Doe', 'john@gmail.com');

  const { id: johnId } = (await prismaClient.user.findUnique({
    where: { email: 'john@gmail.com' },
    select: {
      id: true,
    },
  })) as User;

  //   john tries to follows john
  await request(app)
    .post('/api/users/followers')
    .set('Cookie', johnCookie)
    .send({ followeeId: johnId.toString() })
    .expect(400);
});
