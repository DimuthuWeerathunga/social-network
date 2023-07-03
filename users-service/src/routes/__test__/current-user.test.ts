import request from 'supertest';
import { app } from '../../app';

it('returns a 200 when the user is logged in', async () => {
  const cookie = await global.signin();

  const resposne = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  // console.log('from current user test', resposne.body);
});
