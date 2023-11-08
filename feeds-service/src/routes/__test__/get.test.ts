import request from 'supertest';
import { app } from '../../app';
import { prismaClient } from '../../util/prisma-client';

it('returns the feed of the user when logged in', async () => {
  const followerId = '2';
  const followeeId = '1';

  // create follows
  const followee = prismaClient.follow.create({
    data: {
      followeeId: BigInt(followeeId),
      followerId: BigInt(followerId),
    },
  });

  // sign in
  const cookie = global.signin(followerId, 'follower@gmail.com');

  // create the feed
  const feed = await prismaClient.feed.create({
    data: { userId: BigInt(followerId) },
  });

  // create posts
  // push the posts to feeds
  const post1 = await prismaClient.post.create({
    data: {
      userId: BigInt(followeeId),
      title: 'title',
      content: 'content',
      createdAt: new Date(),
      updatedAt: new Date(),
      feeds: {
        create: [
          {
            feed: {
              connect: {
                id: feed.id,
              },
            },
          },
        ],
      },
    },
  });
  const post2 = await prismaClient.post.create({
    data: {
      userId: BigInt(followeeId),
      title: 'title',
      content: 'content',
      createdAt: new Date(),
      updatedAt: new Date(),
      feeds: {
        create: [
          {
            feed: {
              connect: {
                id: feed.id,
              },
            },
          },
        ],
      },
    },
  });

  // await prismaClient.feedPost.createMany({
  //   data: [{ feedId: feed.id, postId: post1.id }],
  // });
  // await prismaClient.feedPost.createMany({
  //   data: [{ feedId: feed.id, postId: post2.id }],
  // });

  // query the feed
  const response = await request(app)
    .get('/api/feed')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.posts).toHaveLength(2);
});

it('returns a 401 when the user is not logged in', async () => {
  await request(app).get('/api/feed').send().expect(401);
});

it(`user connot query someone else's feed`, async () => {
  // const johnId = '1';
  // const janeId = '2';
  // // get two cookies
  // const john = global.signin(johnId, 'john@gmail.com');
  // const jane = global.signin(janeId, 'jane@gmail.com');
  // // create the feeds
  // await prismaClient.feed.createMany({
  //   data: [
  //     {
  //       userId: BigInt(johnId),
  //     },
  //     {
  //       userId: BigInt(janeId),
  //     },
  //   ],
  // });
  // await request(app).get('/api/feed').send().expect(401);
});
