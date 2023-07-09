import request from 'supertest';
import { app } from '../../../app';

it('successfully creates a post with all inputs', async () => {
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
  const response = await request(app)
    .post('/api/posts')
    .set('Cookie', cookie)
    .send({
      topicId,
      title,
      content,
      imageUrls,
    });

  expect(response.body.topicId).toEqual(topicId);
  expect(response.body.title).toEqual(title);
  expect(response.body.content).toEqual(content);
  expect(response.body.imageUrls).toEqual(imageUrls);
});
