import request from 'supertest';
import { app } from '../../../app';

it('should be able to unlike a post which the user has liked', async () => {
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

  await request(app)
    .post(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(201);

  const response = await request(app)
    .delete(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', cookie)
    .send()
    .expect(204);
});
