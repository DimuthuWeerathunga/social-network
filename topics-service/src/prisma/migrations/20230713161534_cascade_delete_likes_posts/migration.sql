-- DropForeignKey
ALTER TABLE "post_with_topic" DROP CONSTRAINT "post_with_topic_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "topicLikes" DROP CONSTRAINT "topicLikes_topic_id_fkey";

-- AddForeignKey
ALTER TABLE "topicLikes" ADD CONSTRAINT "topicLikes_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_with_topic" ADD CONSTRAINT "post_with_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
