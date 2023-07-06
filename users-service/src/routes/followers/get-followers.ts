import {
  InternalServerError,
  UnAuthorizedError,
  currentUser,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { prismaClient } from '../../util/prisma-client';

const router = express.Router();

router.get(
  '/api/users/followers',
  currentUser,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      throw new UnAuthorizedError();
    }

    let user;
    try {
      user = await prismaClient.user.findUnique({
        where: {
          id: +req.currentUser.id,
        },
        include: {
          followers: {
            include: {
              follower: true,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }
    const followers = user?.followers.map((follower) => ({
      name: follower.follower.name,
      email: follower.follower.email,
    }));

    res.status(200).json(followers);
  }
);

export { router as getFollowersRouter };
