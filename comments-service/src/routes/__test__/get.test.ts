import request from 'supertest';
import { app } from '../../app';
import { prismaClient } from '../../util/prisma-client';

it('shoudl retrieve a signle comment by id', async () => {
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
  const createRes = await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  const commentRes = await request(app)
    .get(`/api/comments/${createRes.body.id}`)
    .send()
    .expect(200);

  expect(commentRes.body.id === createRes.body.id);
});

it('should retrieve comments with correct query params', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      userId: BigInt(1),
    },
  });

  //   sign in
  const cookie = global.signin();

  //   create comments
  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 2' })
    .expect(201);

  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 3' })
    .expect(201);

  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 4' })
    .expect(201);

  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 5' })
    .expect(201);

  const response = await request(app)
    .get(`/api/comments`)
    .query({
      postId: '1',
    })
    .send()
    .expect(200);

  expect(response.body).toHaveLength(5);
});

it('should return a 404 error for comments which are not found for the given filter', async () => {
  // create a post in db
  const post = await prismaClient.post.create({
    data: {
      id: BigInt(1),
      userId: BigInt(1),
    },
  });

  //   sign in
  const cookie = global.signin();

  //   create comments
  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 1' })
    .expect(201);

  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 2' })
    .expect(201);

  await request(app)
    .post('/api/comments')
    .set('Cookie', cookie)
    .send({ postId: '1', content: 'hello there 3' })
    .expect(201);

  const response = await request(app)
    .get(`/api/comments`)
    .query({
      postId: '2',
    })
    .send()
    .expect(404);
});
