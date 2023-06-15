/*
  Warnings:

  - You are about to drop the column `messages` on the `channels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "channels" DROP COLUMN "messages";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "roomChannelId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomChannelId_fkey" FOREIGN KEY ("roomChannelId") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
