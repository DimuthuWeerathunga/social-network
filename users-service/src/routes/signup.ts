import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';

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
    throw new Error('Email already exists');
  }

  // password hashing logic here

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

  //   generate and send the token

  //   temporarily send the created user

  res.status(201).json(user);
});

export { router as signupRouter };
