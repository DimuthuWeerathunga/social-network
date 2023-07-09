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

  const postToBeSent = {
    id: post.id.toString(),
    topicId: post.topic_id?.toString()!,
    userId: post.user_id.toString(),
    title: post.title,
    content: post.content,
    imageUrls: post.image_urls,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  };

  res.status(200).json(postToBeSent);
});

export { router as getPostRouter };
