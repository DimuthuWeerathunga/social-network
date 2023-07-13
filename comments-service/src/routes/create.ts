import {
  BadRequestError,
  InternalServerError,
  currentUser,
  requireAuth,
  validateRequest,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../util/prisma-client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

const router = express.Router();

router.post(
  '/api/comments',
  currentUser,
  requireAuth,
  [
    body('postId')
      .isString()
      .custom(async (postId: string) => {
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
            throw new BadRequestError(
              'Failed to fetch the post which you are trying to comment on'
            );
          }
        } catch (e) {
          if (
            e instanceof BadRequestError ||
            e instanceof PrismaClientKnownRequestError ||
            e instanceof PrismaClientValidationError
          ) {
            throw e;
          } else {
            console.error(e);
            throw new BadRequestError('Bad request');
          }
        }
      }),
    body('content')
      .isString()
      .notEmpty()
      .withMessage('Empty comments are not allowed'),
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
      if (e instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError('Bad request');
      } else {
        console.error(e);
        throw new InternalServerError();
      }
    }
    res.status(201).json({
      id: comment.id.toString(),
      content: comment.content,
    });
  }
);

export { router as createCommentRouter };
