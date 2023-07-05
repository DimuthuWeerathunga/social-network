import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { signupRouter } from './routes/auth/signup';
import { NotFoundError, errorHandler } from '@dw-sn/common';
import { currentUserRouter } from './routes/auth/current-user';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
