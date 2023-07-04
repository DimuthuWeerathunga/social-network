import express, { Request, Response } from 'express';
import { prismaClient } from '../util/prisma-client';
import { BadRequestError, InternalServerError, getJwtKey } from '@dw-sn/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check if there is a user available in the db
  const retrievedUser = await prismaClient.users.findUnique({
    where: {
      email,
    },
  });
  if (!retrievedUser) {
    throw new BadRequestError('Invalid credentials');
  }

  //   compare the passwords
  let passwordsDoMatch;
  try {
    passwordsDoMatch = await bcrypt.compare(password, retrievedUser.password);
  } catch (e) {
    throw new InternalServerError();
  }
  if (!passwordsDoMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // send the cookie with access token
  const userIdString = retrievedUser.id.toString();
  const token = jwt.sign(
    {
      id: userIdString,
      email: retrievedUser.email,
    },
    getJwtKey()
  );

  req.session = { token };

  res.status(200).send();
});

export { router as signinRouter };
