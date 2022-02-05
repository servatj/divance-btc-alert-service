-- CreateTable
CREATE TABLE "Pair" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "pair" TEXT NOT NULL,
    "pair_human" TEXT NOT NULL,

    CONSTRAINT "Pair_pkey" PRIMARY KEY ("id")
);
