import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../../util/prisma-client';

const router = express.Router();

router.get('/api/posts', async (req: Request, res: Response) => {
  // implement this function to filter posts
  // or create a graphql server for that
  res.status(200).send({});
});

router.get('/api/posts/:postId', async (req: Request, res: Response) => {
  // check the db to see if there is a post for this id
  if (!req.params.postId) {
    throw new BadRequestError('Post id not provided');
  }

  let post;
  try {
    post = await prismaClient.post.findUnique({
      where: {
        id: BigInt(req.params.postId),
      },
    });
  } catch (e) {
    console.error(e);
    throw new InternalServerError();
  }

  if (!post) {
    throw new NotFoundError();
  }

  res.status(200).json(post);
});

export { router as getPostRouter };
