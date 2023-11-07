/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `feed` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "feed_user_id_key" ON "feed"("user_id");
