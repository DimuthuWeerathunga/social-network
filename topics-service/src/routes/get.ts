import { BadRequestError, InternalServerError } from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';

const router = express.Router();

router.get('/api/topics', async (req: Request, res: Response) => {
  let topics;
  try {
    topics = await prismaClient.topic.findMany();
  } catch (e) {
    console.error(e);
    throw new InternalServerError();
  }
  res.status(200).json(topics);
});

router.get('/api/topics/:topicId', async (req: Request, res: Response) => {
  const { topicId } = req.params;
  if (!topicId) {
    return new BadRequestError('params not provided');
  }
  let topic;
  try {
    topic = await prismaClient.topic.findUnique({
      where: {
        id: BigInt(topicId),
      },
    });
  } catch (e) {
    console.error(e);
    throw new InternalServerError();
  }
  res.status(200).json(topic);
});

export { router as getTopicRouter };
