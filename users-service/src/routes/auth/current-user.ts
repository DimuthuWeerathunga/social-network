import express, { Request, Response } from 'express';
import { InternalServerError, currentUser, requireAuth } from '@dw-sn/common';
import { prismaClient } from '../../util/prisma-client';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const retrievedUser = await prismaClient.user.findUnique({
      where: {
        id: +req.currentUser!.id,
      },
    });

    if (!retrievedUser) {
      throw new InternalServerError();
    }

    res.status(200).json({
      id: retrievedUser.id.toString(),
      name: retrievedUser.name,
      email: retrievedUser.email,
      gender: retrievedUser.gender,
      birthday: retrievedUser.birthday.toISOString(),
      bio: retrievedUser.bio,
    });
  }
);

export { router as currentUserRouter };
