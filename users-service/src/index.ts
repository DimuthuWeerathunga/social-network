import { DatabaseConnectionError } from '@dw-sn/common';
import { app } from './app';
import { prismaClient } from './util/prisma-client';

(async () => {
  try {
    await prismaClient.$connect();
    app.listen(3001, () => {
      console.log('Listening on Port 3001!');
    });
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
