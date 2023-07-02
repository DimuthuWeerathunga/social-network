import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';
import { Gender } from '../util/genders';
import { BadRequestError } from '@dw-sn/common';

const router = express.Router();

router.post('/api/users/signup', async (req: Request, res: Response) => {
  const { email, password, name, birthday, bio, gender } = req.body;

  // throw if an user is in the db with the given email
  const existingUser = await prismaClient.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new BadRequestError('Account with the email already exists');
  }

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
});

export { router as signupRouter };
