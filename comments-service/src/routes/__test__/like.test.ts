import request from 'supertest';
import { prismaClient } from '../../util/prisma-client';
import { app } from '../../app';

it('should like a comment with correct comment id', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      userId: BigInt(1),
    },
  });

  //   sign in
  const cookie = global.signin();

  //   create a comment
  const commentCreateRes = await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  const likeRes = await request(app)
    .post(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(201);
});

it('should not like a comment with correct comment id twice by same user', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      userId: BigInt(1),
    },
  });

  //   sign in
  const cookie = global.signin();

  //   create a comment
  const commentCreateRes = await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  let likeRes = await request(app)
    .post(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(201);

  likeRes = await request(app)
    .post(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});

it('should fail to like a comment with incorrect comment id', async () => {
  const cookie = global.signin();
  const likeRes = await request(app)
    .post(`/api/comments/1/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});
