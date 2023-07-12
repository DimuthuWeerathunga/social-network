import request from 'supertest';
import { prismaClient } from '../../util/prisma-client';
import { app } from '../../app';

it('should unlike a previously liked comment by a user', async () => {
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

  const unlikeRes = await request(app)
    .delete(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(204);
});

it('should not allow to unlike a previously liked comment by a another user', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      userId: BigInt(1),
    },
  });

  //   sign in
  const ownerCookie = global.signin();
  const otherCookie = global.signin('2', 'jane@gmail.com');

  //   create a comment
  const commentCreateRes = await request(app)
    .post('/api/comments')
    .set('Cookie', ownerCookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  const likeRes = await request(app)
    .post(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', ownerCookie)
    .send()
    .expect(201);

  const unlikeRes = await request(app)
    .delete(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', otherCookie)
    .send()
    .expect(400);
});
