/*
  Warnings:

  - Added the required column `user_id` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "user_id" BIGINT NOT NULL;
