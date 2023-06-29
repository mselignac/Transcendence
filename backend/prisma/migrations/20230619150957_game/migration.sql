-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "user_one" TEXT NOT NULL,
    "user_two" TEXT NOT NULL,
    "score_one" TEXT NOT NULL,
    "score_two" TEXT NOT NULL,
    "victory" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
