import request from 'supertest';
import { app } from '../../app';

it('should delete the topic with the provided id and user being the owner', async () => {
  // sign in
  const cookie = global.signin();

  //creat the topic
  let topicRes = await request(app)
    .post('/api/topics')
    .set('Cookie', cookie)
    .send({
      title: 'Hello new topic 1',
    })
    .expect(201);

  // delete request
  await request(app)
    .delete(`/api/topics/${topicRes.body.id}`)
    .set('Cookie', cookie)
    .expect(204);
});

it('should not delete the topic with the provided id and user not being the owner', async () => {
  // sign in
  const john = global.signin('1', 'john@gmail.com');
  const jane = global.signin('2', 'jane@gmail.com');

  //creat the topic
  let topicRes = await request(app)
    .post('/api/topics')
    .set('Cookie', john)
    .send({
      title: 'Hello new topic 1',
    })
    .expect(201);

  // delete request
  await request(app)
    .delete(`/api/topics/${topicRes.body.id}`)
    .set('Cookie', jane)
    .expect(401);
});
