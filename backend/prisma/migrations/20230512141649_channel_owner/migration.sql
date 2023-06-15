-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "admin" TEXT[],
ADD COLUMN     "is_password" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "owner" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "users_ban" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "blocked" TEXT[];
