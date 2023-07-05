import {
  BadRequestError,
  InternalServerError,
  UnAuthorizedError,
  currentUser,
  validateRequest,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../../util/prisma-client';

const router = express.Router();

router.post(
  '/api/users/follow',
  currentUser,
  [body('followeeId').isNumeric().withMessage('Bad request')],
  validateRequest,
  async (req: Request, res: Response) => {
    // implement follow logic here
    if (!req.currentUser) {
      throw new UnAuthorizedError();
    }

    if (+req.currentUser.id === req.body.followeeId) {
      throw new BadRequestError('A user cannot follow himself');
    }

    try {
      await prismaClient.follow.create({
        data: {
          followee_id: req.body.followeeId,
          follower_id: +req.currentUser.id,
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
