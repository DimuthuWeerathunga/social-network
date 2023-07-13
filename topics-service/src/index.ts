import { app } from './app';
import { prismaClient } from './util/prisma-client';

(async () => {
  try {
    await prismaClient.$connect();
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    app.listen(3003, () => {
      console.log('Listening on Port 3003!');
    });
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
