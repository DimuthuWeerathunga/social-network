import {
  BadRequestError,
  InternalServerError,
  UnAuthorizedError,
  currentUser,
  requireAuth,
} from '@dw-sn/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';

const router = express.Router();

router.delete(
  '/api/topics/:topicId',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { topicId } = req.params;

    if (!topicId) {
      throw new BadRequestError('Topic id is not provided');
    }

    let topic;
    try {
      topic = await prismaClient.topic.findUnique({
        where: {
          id: BigInt(topicId),
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError('Bad request');
      } else {
        console.error(e);
        throw new InternalServerError();
      }
    }

    if (topic?.userId.toString() !== req.currentUser!.id) {
      throw new UnAuthorizedError();
    }

    try {
      topic = await prismaClient.topic.delete({
        where: {
          id: BigInt(topicId),
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError('Bad request');
      } else {
        console.error(e);
        throw new InternalServerError();
      }
    }
    res.status(204).send();
  }
);

export { router as delteTopicRouter };
