/*
  Warnings:

  - You are about to drop the column `messages` on the `maps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "roomId" TEXT;

-- AlterTable
ALTER TABLE "maps" DROP COLUMN "messages";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "maps"("id") ON DELETE SET NULL ON UPDATE CASCADE;
