import request from 'supertest';
import { app } from '../../../app';

it('expect a 200 and cookie to be received on successful login', async () => {
  await global.getCookie();

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'john@gmail.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('expect a 400 with bad credentials', async () => {
  await global.getCookie();

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'john@gail.com',
      password: 'password',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'john@gmail.com',
      password: 'password1',
    })
    .expect(400);
});
