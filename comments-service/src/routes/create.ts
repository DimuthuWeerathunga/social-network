import {
  InternalServerError,
  currentUser,
  requireAuth,
  validateRequest,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../util/prisma-client';

const router = express.Router();

router.post(
  '/api/comments',
  currentUser,
  requireAuth,
  [
    body('postId').custom(async (postId: string) => {
      if (!postId) {
        throw new Error('Post id not provided');
      }
      try {
        const post = await prismaClient.post.findUnique({
          where: {
            id: BigInt(postId),
          },
        });
        if (!post) {
          throw new Error(
            'Failed to fetch the post which you are trying to comment on'
          );
        }
      } catch (e) {
        console.error(e);
        if (e instanceof Error) {
          throw new Error(e.message);
        }
        throw new Error('Unknown error validating post id');
      }
    }),
    body('content').notEmpty().withMessage('Empty comments are not allowed'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let comment;
    try {
      comment = await prismaClient.comment.create({
        data: {
          userId: BigInt(req.currentUser!.id),
          postId: BigInt(req.body.postId),
          parentId: req.body.parentId ? BigInt(req.body.parentId) : null,
          content: req.body.content,
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }
    res.status(201).json({
      id: comment.id.toString(),
      content: comment.content,
    });
  }
);

export { router as createCommentRouter };
