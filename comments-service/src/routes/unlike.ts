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

router.delete(
  '/api/comments/:commentId/likes',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    let deletedLike;
    try {
      deletedLike = await prismaClient.comment_like.delete({
        where: {
          user_id_comment_id: {
            comment_id: BigInt(req.params.commentId),
            user_id: BigInt(req.currentUser!.id),
          },
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
    res.status(204).send();
  }
);

export { router as unlikeCommentRouter };
