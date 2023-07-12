import request from 'supertest';
import { app } from '../../../app';

it('should return the likes count of a given post', async () => {
  // sign in
  const ownerCookie = global.signin();
  const janeCookie = global.signin('2', 'jane@gmail.com');
  const jillCookie = global.signin('3', 'jil@gmail.com');

  // create a topic
  const topicId = await global.addTopic();

  // create a post
  const title = 'Test title';
  const content = 'Test content';
  const imageUrls = [
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
    'https://github.com/DimuthuWeerathunga/social-network/blob/main/Recommendation%20System%20V1.jpg?raw=true',
  ];
  const createPostRes = await request(app)
    .post('/api/posts')
    .set('Cookie', ownerCookie)
    .send({
      topicId,
      title,
      content,
      imageUrls,
    });

  await request(app)
    .post(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', ownerCookie)
    .send()
    .expect(201);

  await request(app)
    .post(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', janeCookie)
    .send()
    .expect(201);

  await request(app)
    .post(`/api/posts/${createPostRes.body.id}/likes`)
    .set('Cookie', jillCookie)
    .send()
    .expect(201);

  const response = await request(app)
    .get(`/api/posts/${createPostRes.body.id}/likes`)
    .send()
    .expect(200);

  expect(response.body.likesCount).toEqual(3);
});
