-- CreateTable
CREATE TABLE "feed" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow" (
    "followee_id" BIGINT NOT NULL,
    "follower_id" BIGINT NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("followee_id","follower_id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" BIGSERIAL NOT NULL,
    "topic_id" BIGINT,
    "user_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "image_urls" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed_post" (
    "feed_id" BIGINT NOT NULL,
    "post_id" BIGINT NOT NULL,

    CONSTRAINT "feed_post_pkey" PRIMARY KEY ("feed_id","post_id")
);

-- CreateTable
CREATE TABLE "topic_like" (
    "user_id" BIGINT NOT NULL,
    "topic_id" BIGINT NOT NULL,
    "liked_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topic_like_pkey" PRIMARY KEY ("user_id","topic_id")
);
