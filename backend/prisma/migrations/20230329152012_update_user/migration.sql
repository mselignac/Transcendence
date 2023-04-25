/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[login]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "nickName" TEXT NOT NULL,
ADD COLUMN     "token" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- DropTable
DROP TABLE "bookmarks";

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");
