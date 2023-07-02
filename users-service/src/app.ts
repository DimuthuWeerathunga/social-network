import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@dw-sn/common';

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(signupRouter);

app.use(errorHandler);

export { app };
