import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';
import { Gender } from '../util/genders';
import { BadRequestError, getJwtKey, validateRequest } from '@dw-sn/common';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        throw new Error('An account with this email address already exists');
      }
    }),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body()
      .custom((body) => body.password === body.confirmPassword)
      .withMessage('Two password fields do not match'),
    body('name').trim().notEmpty().withMessage('Name field is empty'),
    body('birthday')
      .trim()
      .custom(async (birthday) => {
        let date;
        try {
          date = new Date(birthday);
        } catch (e) {
          throw new Error('Invalid birthday');
        }
        if (date.getTime() > new Date().getTime()) {
          throw new Error('Birthday must be in the past');
        }
      }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name, birthday, bio, gender } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);

    let user;
    try {
      user = await prismaClient.users.create({
        data: {
          name,
          email,
          password: hashedPw,
          birthday: new Date(birthday),
          bio,
          gender: Gender[gender as Gender],
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestError('Creating user failed check your input');
    }

    //   generate and send the token cookie
    const userIdString = user.id.toString();
    const token = jwt.sign(
      {
        id: userIdString,
        email: user.email,
      },
      getJwtKey()
    );

    req.session = { token };

    res.status(201).json({
      message: 'user created',
      user: {
        name,
        email,
      },
    });
  }
);

export { router as signupRouter };
