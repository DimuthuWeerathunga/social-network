import request from 'supertest';
import { app } from '../../../app';

it('returns a 200 when the user is logged in', async () => {
  const cookie = await global.signin();

  await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
});

it('returns a 401 when the user is not logged in', async () => {
  await request(app).get('/api/users/currentuser').send().expect(401);
});
