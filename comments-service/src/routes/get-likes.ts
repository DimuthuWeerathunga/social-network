import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@dw-sn/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const router = express.Router();

router.get(
  '/api/comments/:commentId/likes',
  async (req: Request, res: Response) => {
    let comment;
    try {
      comment = await prismaClient.comment.findUnique({
        where: {
          id: BigInt(req.params.commentId),
        },
        include: {
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
      if (!comment) {
        throw new NotFoundError();
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundError();
      } else if (e instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError('Bad request');
      } else {
        console.error(e);
        throw new InternalServerError();
      }
    }
    const likesCount = comment._count.likes;
    res.status(200).json({ likesCount });
  }
);

export { router as getLikesRouter };
