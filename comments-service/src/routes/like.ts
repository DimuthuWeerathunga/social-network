import {
  BadRequestError,
  InternalServerError,
  currentUser,
  requireAuth,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const router = express.Router();

router.post(
  '/api/comments/:commentId/likes',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    // check the db to see if there is a comment with the given id
    // Edit I don't think we need to do that since I have the db constraint

    let cretedLike;
    try {
      cretedLike = await prismaClient.commentLike.create({
        data: {
          userId: BigInt(req.currentUser!.id),
          commentId: BigInt(req.params.commentId),
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
    res.status(201).json(cretedLike);
  }
);

export { router as likeCommentRouter };
