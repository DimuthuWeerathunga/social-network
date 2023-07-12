import express, { Request, Response } from 'express';
import { prismaClient } from '../../util/prisma-client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@dw-sn/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const router = express.Router();

router.get('/api/posts/:postId/likes', async (req: Request, res: Response) => {
  let post;
  try {
    post = await prismaClient.post.findUnique({
      where: {
        id: BigInt(req.params.postId),
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    if (!post) {
      throw new NotFoundError();
    }
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else if (e instanceof PrismaClientKnownRequestError) {
      throw new BadRequestError('Bad request');
    } else {
      console.error(e);
      throw new InternalServerError();
    }
  }
  const likesCount = post._count.likes;
  res.status(200).json({ likesCount });
});

export { router as getPostLikesRouter };
