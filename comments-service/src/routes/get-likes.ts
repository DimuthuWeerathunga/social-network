import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';
import { InternalServerError, NotFoundError } from '@dw-sn/common';

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
          likes: true,
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
