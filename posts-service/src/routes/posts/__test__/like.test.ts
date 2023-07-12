import request from 'supertest';
import { app } from '../../../app';

it('should be able to like a post by a logged in user', async () => {
  // add a topic first
  const topicId = await global.addTopic();
  // get the cookie
  const cookie = global.signin();
  // create the post
  const title = 'Test title';
  const content = 'Test content';
  const imageUrls = [
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
  ];
  const createPostRes = await request(app)
    .post('/api/posts')
    .set('Cookie', cookie)
    .send({
      topicId,
      title,
      content,
      imageUrls,
    });

  const response = await request(app)
    .post(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(201);
});

it('should not be able to like a post by a logged in user more than once', async () => {
  // add a topic first
  const topicId = await global.addTopic();
  // get the cookie
  const cookie = global.signin();
  // create the post
  const title = 'Test title';
  const content = 'Test content';
  const imageUrls = [
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
  ];
  const createPostRes = await request(app)
    .post('/api/posts')
    .set('Cookie', cookie)
    .send({
      topicId,
      title,
      content,
      imageUrls,
    });

  let response = await request(app)
    .post(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(201);

  response = await request(app)
    .post(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});
