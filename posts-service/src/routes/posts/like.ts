import {
  BadRequestError,
  InternalServerError,
  currentUser,
  requireAuth,
  validateRequest,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../../util/prisma-client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const router = express.Router();

router.post(
  '/api/posts/:postId/likes',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { postId } = req.params;

    let createdLike;
    try {
      createdLike = await prismaClient.post_like.create({
        data: {
          user_id: BigInt(req.currentUser!.id),
          post_id: BigInt(postId),
        },
      });
      if (!createdLike) {
        throw new BadRequestError('Bad request');
      }
    } catch (e) {
      if (
        e instanceof BadRequestError ||
        e instanceof PrismaClientKnownRequestError
      ) {
        throw new BadRequestError('Bad request');
      } else {
        console.error(e);
        throw new InternalServerError();
      }
    }

    res.status(201).send(createdLike);
  }
);

export { router as likePostRouter };
