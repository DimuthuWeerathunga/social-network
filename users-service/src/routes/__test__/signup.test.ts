import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'johngmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'a',
      confirmPassword: 'a',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(400);
});

it('returns a 400 with missing name', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'john@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(400);
});

it('returns a 400 when the birthday is in the future', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2033-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(201);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      birthday: '2003-07-02T16:03:02.644Z',
      bio: 'Hello there',
      gender: 'MALE',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
