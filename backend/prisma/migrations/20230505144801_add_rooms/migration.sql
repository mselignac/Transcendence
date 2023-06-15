-- CreateTable
CREATE TABLE "maps" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "channel" BOOLEAN NOT NULL,
    "users" TEXT[],
    "messages" TEXT[],

    CONSTRAINT "maps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "maps_id_key" ON "maps"("id");
