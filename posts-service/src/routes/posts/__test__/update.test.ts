import request from 'supertest';
import { app } from '../../../app';

it('successfully updates a post with all inputs populated', async () => {
  // add a topic first
  const topicId = await global.addTopic();
  // get the cookie
  const cookie = global.signin();
  // create an example post
  const id = await global.createExamplePost(topicId, cookie);

  const title = 'Test title other';
  const content = 'Test content other';
  const imageUrls = [
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
  ];
  const response = await request(app)
    .put('/api/posts')
    .set('Cookie', cookie)
    .send({
      id,
      topicId,
      title,
      content,
      imageUrls,
    })
    .expect(200);

  expect(response.body.topicId).toEqual(topicId);
  expect(response.body.title).toEqual(title);
  expect(response.body.content).toEqual(content);
  expect(response.body.imageUrls).toEqual(imageUrls);
});

it('successfully updates a post with all inputs populated except topicId', async () => {
  // add a topic first
  const topicId = await global.addTopic();
  // get the cookie
  const cookie = global.signin();
  // create an example post
  const id = await global.createExamplePost(topicId, cookie);

  const title = 'Test title other';
  const content = 'Test content other';
  const imageUrls = [
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
  ];
  const response = await request(app)
    .put('/api/posts')
    .set('Cookie', cookie)
    .send({
      id,
      title,
      content,
      imageUrls,
    })
    .expect(200);

  expect(response.body.topicId).toBeNull();
  expect(response.body.title).toEqual(title);
  expect(response.body.content).toEqual(content);
  expect(response.body.imageUrls).toEqual(imageUrls);
});
