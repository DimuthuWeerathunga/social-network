import { app } from './app';
import { prismaClient } from './util/prisma-client';

try {
  await prismaClient.$connect();
} catch (e) {
  console.error(e);
  process.exit();
}

app.listen(3000, () => {
  console.log('Listening on Port 3000!');
});
