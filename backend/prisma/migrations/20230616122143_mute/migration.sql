-- CreateTable
CREATE TABLE "Mute" (
    "user" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "roomChannelId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Mute_user_key" ON "Mute"("user");

-- AddForeignKey
ALTER TABLE "Mute" ADD CONSTRAINT "Mute_roomChannelId_fkey" FOREIGN KEY ("roomChannelId") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
