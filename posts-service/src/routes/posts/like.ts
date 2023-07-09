import {
  BadRequestError,
  InternalServerError,
  currentUser,
  requireAuth,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../../util/prisma-client';

const router = express.Router();

router.post(
  '/api/posts/likes',
  currentUser,
  requireAuth,
  [body('postId').notEmpty().withMessage('Post id not provided')],
  async (req: Request, res: Response) => {
    const { postId } = req.body;
    let postIdBigInt;
    try {
      postIdBigInt = BigInt(postId);
    } catch (e) {
      console.error(e);
      throw new BadRequestError('Invalid post id');
    }

    try {
      await prismaClient.post_like.create({
        data: {
          user_id: BigInt(req.currentUser!.id),
          post_id: postIdBigInt,
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }
  }
);
