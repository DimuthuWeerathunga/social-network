import express, { Request, Response } from 'express';
import { prismaClient } from '../../util/prisma-client';
import { InternalServerError, UnAuthorizedError } from '@dw-sn/common';

const router = express.Router();

// This route handler should only be accessed by internal microservices

router.post('/api/posts/topics', async (req: Request, res: Response) => {
  // make sure only test env can process the request for now
  if (process.env.NODE_ENV !== 'test') {
    throw new UnAuthorizedError();
  }
  const { id, title } = req.body;
  try {
    await prismaClient.topic.create({
      data: {
        id,
        title,
      },
    });
  } catch (e) {
    console.error(e);
    throw new InternalServerError();
  }
  res.status(201).send();
});
