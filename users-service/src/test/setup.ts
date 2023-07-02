beforeAll(async () => {
  process.env.DATABASE_URL =
    'postgresql://user:password@localhost:5432/users_db?schema=public';
});
