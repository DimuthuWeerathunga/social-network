import request from 'supertest';
import { app } from '../../../app';

it('should delete a post which belongs to the owner on a request made by the owner', async () => {
  // sign in
  const cookie = global.signin();

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
    .set('Cookie', cookie)
    .send({
      topicId,
      title,
      content,
      imageUrls,
    });

  // delete the post
  const response = await request(app)
    .delete(`/api/posts/${createPostRes.body.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(204);

  //   expect a 404 when querying the deleted post
  await request(app)
    .get(`/api/posts/${createPostRes.body.id}`)
    .send()
    .expect(404);
});

it('should not allow a user to delete a post made by someone else', async () => {
  // sign in and get cookies for two users
  const ownerCookie = global.signin();
  const otherCookie = global.signin('2', 'jane@gmail.com');

  //   add a topic
  const topicId = await global.addTopic();

  //   create a post
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
    })
    .expect(201);

  // try to delete a post with not the owner
  await request(app)
    .delete(`/api/posts/${createPostRes.body.id}`)
    .set('Cookie', otherCookie)
    .send()
    .expect(401);
});
