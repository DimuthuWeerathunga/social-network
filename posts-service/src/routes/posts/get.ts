import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../../util/prisma-client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const router = express.Router();

router.get('/api/posts', async (req: Request, res: Response) => {
  // implement this function to filter posts
  // or create a graphql server for that
  res.status(200).send({});
});

router.get('/api/posts/:postId', async (req: Request, res: Response) => {
  let post;
  try {
    post = await prismaClient.post.findUnique({
      where: {
        id: BigInt(req.params.postId),
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

  res.status(200).json(post);
});

export { router as getPostRouter };
