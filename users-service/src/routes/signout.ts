import { UnAuthorizedError, currentUser } from '@dw-sn/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
  '/api/users/signout',
  currentUser,
  (req: Request, res: Response) => {
    if (!req.currentUser) {
      throw new UnAuthorizedError();
    }
    req.session = null;
    res.status(200).send();
  }
);

export { router as signoutRouter };
