import request from 'supertest';
import { app } from '../../../app';

it('Should, given a post in db it should return that post upon query', async () => {
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
  const createResponse = await request(app)
    .post('/api/posts')
    .set('Cookie', cookie)
    .send({
      topicId,
      title,
      content,
      imageUrls,
    })
    .expect(201);

  // query the endpoint
  const response = await request(app)
    .get(`/api/posts/${createResponse.body.id}`)
    .send()
    .expect(200);

  expect(response.body.topicId).toEqual(topicId);
  expect(response.body.title).toEqual(title);
  expect(response.body.content).toEqual(content);
  expect(response.body.imageUrls).toEqual(imageUrls);
});

it('should return 404 for a post that is not in db', async () => {
  await request(app).get('/api/posts/1').send().expect(404);
});
