import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnAuthorizedError,
  currentUser,
  requireAuth,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../../util/prisma-client';

const router = express.Router();

router.delete(
  '/api/posts/:postId',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    // check the person who is trying to delete the post is the owner himself,
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

    if (post.user_id !== BigInt(req.currentUser!.id)) {
      throw new UnAuthorizedError();
    }

    let deletedPost;
    try {
      deletedPost = await prismaClient.post.delete({
        where: {
          id: BigInt(req.params.postId),
        },
      });
    } catch (e) {
      console.error(e);
    }
    if (!deletedPost) {
      throw new InternalServerError();
    }
    res.status(204).send();
  }
);

export { router as deletePostRouter };
