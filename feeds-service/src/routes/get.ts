import {
  BadRequestError,
  InternalServerError,
  currentUser,
  requireAuth,
} from '@dw-sn/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';

const router = express.Router();

router.get(
  '/api/feed',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;

    let feed;
    try {
      feed = await prismaClient.feed.findUnique({
        where: {
          userId: BigInt(userId),
        },
        include: {
          posts: true,
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
    res.status(200).json(feed);
  }
);

export { router as getFeedRouter };
