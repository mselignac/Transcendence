/*
  Warnings:

  - You are about to drop the column `channel` on the `maps` table. All the data in the column will be lost.
  - You are about to drop the column `users` on the `maps` table. All the data in the column will be lost.
  - Added the required column `user_one` to the `maps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_two` to the `maps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maps" DROP COLUMN "channel",
DROP COLUMN "users",
ADD COLUMN     "user_one" TEXT NOT NULL,
ADD COLUMN     "user_two" TEXT NOT NULL;
