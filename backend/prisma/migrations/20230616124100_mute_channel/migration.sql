-- DropForeignKey
ALTER TABLE "Mute" DROP CONSTRAINT "Mute_roomChannelId_fkey";

-- AddForeignKey
ALTER TABLE "Mute" ADD CONSTRAINT "Mute_roomChannelId_fkey" FOREIGN KEY ("roomChannelId") REFERENCES "channels"("name") ON DELETE SET NULL ON UPDATE CASCADE;
