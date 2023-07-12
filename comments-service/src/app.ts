import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@dw-sn/common';
import { createCommentRouter } from './routes/create';
import { getCommentsRouter } from './routes/get';
import { deleteCommentsRouter } from './routes/delete';
import { likeCommentRouter } from './routes/like';
import { unlikeCommentRouter } from './routes/unlike';
import { getLikesRouter } from './routes/get-likes';

declare global {
  interface BigInt {
    toJSON: () => string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(createCommentRouter);
app.use(getCommentsRouter);
app.use(deleteCommentsRouter);
app.use(likeCommentRouter);
app.use(unlikeCommentRouter);
app.use(getLikesRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
