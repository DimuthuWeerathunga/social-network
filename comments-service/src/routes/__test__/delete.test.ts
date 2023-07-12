import request from 'supertest';
import { prismaClient } from '../../util/prisma-client';
import { app } from '../../app';

it('should delete a comment with correct comment id and correct owner', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      user_id: BigInt(1),
    },
  });

  //   sign in
  const cookie = global.signin();

  //   create a comment
  const createResponse = await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  await request(app)
    .delete(`/api/comments/${createResponse.body.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(204);

  await request(app).get('/api/comments');
});

it('should not delete a comment with correct comment id and incorrect owner', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      user_id: BigInt(1),
    },
  });

  //   sign in
  const ownerCookie = global.signin();
  const otherCookie = global.signin('2', 'jane@gmail.com');

  //   create a comment
  const createResponse = await request(app)
    .post('/api/comments')
    .set('Cookie', ownerCookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  await request(app)
    .delete(`/api/comments/${createResponse.body.id}`)
    .set('Cookie', otherCookie)
    .send()
    .expect(401);
});
