import {
  InternalServerError,
  UnAuthorizedError,
  currentUser,
  validateRequest,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../../util/prisma-client';
import { Users } from '@prisma/client';

const router = express.Router();

router.post(
  '/api/users/follow',
  currentUser,
  [body('followeeId').notEmpty().withMessage('Bad request')],
  validateRequest,
  async (req: Request, res: Response) => {
    // implement follow logic here
    if (!req.currentUser) {
      throw new UnAuthorizedError();
    }

    let followerIdInt;
    let followeeIdInt;
    try {
      followerIdInt = +req.currentUser.id;
      followeeIdInt = +req.body.followeeId;

      await prismaClient.followers.create({
        data: {
          followee_id: followeeIdInt,
          follower_id: followerIdInt,
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }
    res.status(201).send();
  }
);
