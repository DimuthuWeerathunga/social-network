import { NotFoundError, errorHandler } from '@dw-sn/common';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { getFeedRouter } from './routes/get';

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

app.use(getFeedRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
