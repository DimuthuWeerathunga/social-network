import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
