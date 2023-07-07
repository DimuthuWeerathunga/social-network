import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@dw-sn/common';
import { createPostRouter } from './routes/posts/create';
import { addTopicRouter } from './routes/topics/add-topic';
import { getPostRouter } from './routes/posts/get';

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(createPostRouter);
app.use(addTopicRouter);
app.use(getPostRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
