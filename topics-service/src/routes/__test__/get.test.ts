import request from 'supertest';
import { app } from '../../app';

it('should get all topics', async () => {
  const cookie = global.signin();

  let topicRes = await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'Hello new topic 1',
    })
    .expect(201);

  topicRes = await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'Hello new topic 2',
    })
    .expect(201);

  topicRes = await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'Hello new topic 3',
    })
    .expect(201);

  const response = await request(app).get('/api/topics').expect(200);

  expect(response.body).toHaveLength(3);
});

it('should get the topic with the provided id', async () => {
  const cookie = global.signin();

  let topicRes = await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'Hello new topic 1',
    })
    .expect(201);

  const response = await request(app)
    .get(`/api/topics/${topicRes.body.id}`)
    .expect(200);

  expect(response.body).toBeDefined();
  expect(response.body.title).toEqual('Hello new topic 1');
});
