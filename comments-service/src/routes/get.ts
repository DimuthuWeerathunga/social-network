import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';

const router = express.Router();

router.get('/api/comments/:commentId', async (req: Request, res: Response) => {
  if (!req.params.commentId) {
    throw new BadRequestError('comment id must be provided');
  }
  let comment;
  try {
    comment = await prismaClient.comment.findUnique({
      where: {
        id: BigInt(req.params.commentId),
      },
    });
    if (!comment) {
      throw new NotFoundError();
    }
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      console.error(e);
      throw new InternalServerError();
    }
  }

  res.status(200).json(comment);
});

router.get('/api/comments', async (req: Request, res: Response) => {
  const { postId, parentCommentId } = req.query;

  if (!postId && !parentCommentId) {
    throw new BadRequestError('Filter criteria missing');
  }

  let comments;
  if (parentCommentId) {
    try {
      comments = await prismaClient.comment.findMany({
        where: {
          parent_id: BigInt(parentCommentId.toString()),
        },
      });
      if (comments.length == 0) {
        throw new NotFoundError();
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw e;
      } else {
        console.error(e);
        throw new InternalServerError();
      }
    }
  } else if (postId) {
    try {
      comments = await prismaClient.comment.findMany({
        where: {
          post_id: BigInt(postId.toString()),
        },
      });
      if (comments.length == 0) {
        throw new NotFoundError();
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw e;
      } else {
        console.error(e);
        throw new InternalServerError();
      }
    }
  }

  res.status(200).json(comments);
});

export { router as getCommentsRouter };
