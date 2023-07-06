import { currentUser, requireAuth } from '@dw-sn/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
  '/api/users/signout',
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    req.session = null;
    res.status(200).send();
  }
);

export { router as signoutRouter };
