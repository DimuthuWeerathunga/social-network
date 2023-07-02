import { app } from './app';

app.listen(3000, () => {
  console.log('Listening on port 3000!');
  console.log('Is env picked up?');
  console.log(process.env.DATABASE_URL);
});
