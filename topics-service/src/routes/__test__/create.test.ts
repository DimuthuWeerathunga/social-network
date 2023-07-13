import request from 'supertest';
import { app } from '../../app';

it('should create a topic with correct input', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'Hello new topic',
    })
    .expect(201);
});

it('should not create a topic with incorrect input', async () => {
  const cookie = global.signin();
  await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: '',
    })
    .expect(400);

  await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 123,
    })
    .expect(400);

  await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({})
    .expect(400);
});

it('should not allow duplicate topics', async () => {
  const cookie = global.signin();
  await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'new topic',
    })
    .expect(201);

  await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'new topic',
    })
    .expect(400);
});
