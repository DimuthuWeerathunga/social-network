import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';
import { Gender } from '../util/genders';
import { BadRequestError, validateRequest } from '@dw-sn/common';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('email').custom(async (email) => {
      const existingUser = await prismaClient.users.findUnique({
        where: {
          email,
        },
      });
      if (existingUser) {
        throw new BadRequestError(
          'Account with this email address already exists'
        );
      }
    }),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body()
      .custom((body) => body.password === body.confirmPassword)
      .withMessage('Two password fields do not match'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name, birthday, bio, gender } = req.body;
    // password hashing logic here

    try {
      const user = await prismaClient.users.create({
        data: {
          name,
          email,
          password,
          birthday: new Date(birthday),
          bio,
          gender: Gender[gender as Gender],
        },
      });
    } catch (e) {
      throw new BadRequestError('Creating user failed check your input');
    }

    //   generate and send the token

    //   temporarily send the created user

    res.status(201).json({
      message: 'user created',
      user: {
        name,
        email,
        bio,
      },
    });
  }
);

export { router as signupRouter };
