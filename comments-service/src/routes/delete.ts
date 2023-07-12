import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnAuthorizedError,
  currentUser,
  requireAuth,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';

const router = express.Router();

router.delete(
  '/api/comments/:commentId',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { commentId } = req.params;
    if (!commentId) {
      throw new BadRequestError('Comment id must be provided');
    }

    //   check the user if he is the owner of the comment
    let comment;
    try {
      comment = await prismaClient.comment.findUnique({
        where: {
          id: BigInt(commentId),
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
    if (comment.user_id.toString() !== req.currentUser!.id) {
      throw new UnAuthorizedError();
    }

    let deletedComment;
    try {
      deletedComment = await prismaClient.comment.delete({
        where: {
          id: comment.id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }

    if (!deletedComment) {
      throw new InternalServerError();
    }

    res.status(204).json(deletedComment);
  }
);

export { router as deleteCommentsRouter };
