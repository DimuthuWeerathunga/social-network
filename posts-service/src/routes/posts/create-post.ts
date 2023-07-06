import { currentUser, validateRequest } from '@dw-sn/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { prismaClient } from '../../util/prisma-client';

const router = express.Router();

router.post(
  '/api/posts',
  currentUser,
  [
    body('title').notEmpty().withMessage('A title should be provided'),
    body('content').notEmpty().withMessage('Content must not be blank'),
    body('topicId')
      .isNumeric()
      .withMessage('topicId must be a number')
      .custom(async (topicId: number) => {
        // query the database to see if there is a topic with this id
        try {
          const retrievedTopic = await prismaClient.topic.findUnique({
            where: {
              id: topicId,
            },
          });
          if (!retrievedTopic) {
            throw new Error();
          }
        } catch (e) {
          console.error(e);
          throw new Error('Topic does not exist!');
        }
      }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // create a new post
  }
);
