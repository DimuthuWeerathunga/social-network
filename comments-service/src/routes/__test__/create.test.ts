import request from 'supertest';
import { prismaClient } from '../../util/prisma-client';
import { app } from '../../app';

it('should create a comment with valid input', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      userId: BigInt(1),
    },
  });

  //   sign in
  const cookie = global.signin();

  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there' })
    .expect(201);
});
