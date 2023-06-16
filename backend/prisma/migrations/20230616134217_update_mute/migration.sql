-- DropIndex
DROP INDEX "Mute_user_key";

-- AlterTable
ALTER TABLE "Mute" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Mute_pkey" PRIMARY KEY ("id");
