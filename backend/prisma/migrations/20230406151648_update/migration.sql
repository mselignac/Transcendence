/*
  Warnings:

  - You are about to drop the column `accessToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nickName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[checkID]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatarUrl` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkID` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoFactorAuthenticationSecret` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_accessToken_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accessToken",
DROP COLUMN "hash",
DROP COLUMN "nickName",
ADD COLUMN     "avatarUrl" TEXT NOT NULL,
ADD COLUMN     "checkID" TEXT NOT NULL,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phonenumber" TEXT,
ADD COLUMN     "twoFactorAuthenticationSecret" TEXT NOT NULL,
ADD COLUMN     "twofactor" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_checkID_key" ON "users"("checkID");
