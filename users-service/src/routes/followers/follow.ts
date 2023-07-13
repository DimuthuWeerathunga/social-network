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

const router = express.Router();

router.post(
  '/api/users/followers',
  currentUser,
  requireAuth,
  [
    body('followeeId')
      .isString()
      .withMessage('Bad request')
      .notEmpty()
      .withMessage('Bad request'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    if (req.currentUser!.id === req.body.followeeId) {
      throw new BadRequestError('A user cannot follow himself');
    }

    try {
      await prismaClient.follow.create({
        data: {
          followee_id: BigInt(req.body.followeeId),
          follower_id: BigInt(req.currentUser!.id),
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }
    res.status(201).send({ message: 'Relationship added' });
  }
);

export { router as followRouter };
