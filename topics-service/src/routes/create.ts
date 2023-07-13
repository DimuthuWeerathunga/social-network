import {
  InternalServerError,
  currentUser,
  requireAuth,
  validateRequest,
} from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../util/prisma-client';

const router = express.Router();

router.post(
  '/api/topics',
  currentUser,
  requireAuth,
  [
    body('title')
      .isString()
      .withMessage('Title must be a string')
      .notEmpty()
      .withMessage('Empty topics are not allowed'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let createdTopic;
    try {
      createdTopic = await prismaClient.topic.create({
        data: {
          userId: BigInt(req.currentUser!.id),
          title: req.body.title,
        },
      });
      if (!createdTopic) {
        throw new InternalServerError();
      }
    } catch (e) {
      if (!(e instanceof InternalServerError)) {
        console.error(e);
      }
      throw new InternalServerError();
    }
    res.status(201).json(createdTopic);
  }
);

export { router as createTopicRouter };
