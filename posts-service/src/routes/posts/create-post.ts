import {
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
  '/api/posts',
  currentUser,
  requireAuth,
  [
    body('topicId')
      .isNumeric()
      .withMessage('topicId must be a number')
      .custom(async (topicId: number) => {
        // query the database to see if there is a topic with the given topic id
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
    body('title').notEmpty().withMessage('A title should be provided'),
    body('content').notEmpty().withMessage('Content must not be blank'),
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
          topic_id: topicId,
          title,
          content,
          image_urls: imageUrls,
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }

    const postToBeSent = {
      ...post,
      id: +post.id.toString(),
      topicId: +post.topic_id?.toString()!,
    };

    res.status(201).json(postToBeSent);
  }
);

export { router as createPostRouter };
