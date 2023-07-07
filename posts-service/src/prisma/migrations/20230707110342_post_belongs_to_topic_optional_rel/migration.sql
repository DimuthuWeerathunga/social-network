-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_topic_id_fkey";

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "topic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
