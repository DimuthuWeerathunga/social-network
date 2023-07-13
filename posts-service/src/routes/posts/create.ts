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
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

const router = express.Router();

router.post(
  '/api/posts',
  currentUser,
  requireAuth,
  [
    body('topicId').custom(async (topicId: string) => {
      // query the database to see if there is a topic with the given topic id
      try {
        const retrievedTopic = await prismaClient.topic.findUnique({
          where: {
            id: BigInt(topicId),
          },
        });
        if (!retrievedTopic) {
          throw new BadRequestError('Failed to fetch the topic');
        }
      } catch (e) {
        if (
          e instanceof BadRequestError ||
          e instanceof PrismaClientKnownRequestError ||
          e instanceof PrismaClientValidationError
        ) {
          throw e;
        } else {
          console.error(e);
          throw new BadRequestError('Bad request');
        }
      }
    }),
    body('title')
      .isString()
      .notEmpty()
      .withMessage('A title should be provided'),
    body('content')
      .isString()
      .notEmpty()
      .withMessage('Content must not be blank'),
    body('imageUrls')
      .isArray()
      .withMessage('Image url format should be an array of strings'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // create a new post
    const { topicId, title, content, imageUrls } = req.body;

    let post;

    try {
      post = await prismaClient.post.create({
        data: {
          userId: BigInt(req.currentUser!.id),
          topicId: BigInt(topicId),
          title,
          content,
          imageUrls: imageUrls,
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

    res.status(201).json(post);
  }
);

export { router as createPostRouter };
