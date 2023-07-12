import request from 'supertest';
import { app } from '../../app';
import { prismaClient } from '../../util/prisma-client';

it('should retrieve number of likes for a given comment', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      user_id: BigInt(1),
    },
  });

  //   sign in
  const ownerCookie = global.signin();
  const janeCookie = global.signin('2', 'jane@gmail.com');
  const jillCookie = global.signin('3', 'jill@gmail.com');

  //   create a comment
  const commentCreateRes = await request(app)
    .post('/api/comments')
    .set('Cookie', ownerCookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  // create likes
  await request(app)
    .post(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', ownerCookie)
    .send()
    .expect(201);

  await request(app)
    .post(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', janeCookie)
    .send()
    .expect(201);

  await request(app)
    .post(`/api/comments/${commentCreateRes.body.id}/likes`)
    .set('Cookie', jillCookie)
    .send()
    .expect(201);

  const likeCountRes = await request(app)
    .get(`/api/comments/${commentCreateRes.body.id}/likes`)
    .send()
    .expect(200);

  expect(likeCountRes.body.likesCount).toEqual(3);
});
