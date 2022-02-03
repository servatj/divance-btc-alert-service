/*
  Warnings:

  - Added the required column `logo_url` to the `btc_ath` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Btc" ADD CONSTRAINT "Btc_pkey" PRIMARY KEY ("symbol");

-- AlterTable
ALTER TABLE "btc_ath" ADD COLUMN     "logo_url" TEXT NOT NULL,
ADD CONSTRAINT "btc_ath_pkey" PRIMARY KEY ("symbol");

-- CreateTable
CREATE TABLE "btc_ath_aux" (
    "symbol" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "networks" TEXT NOT NULL,
    "totalSupply" DOUBLE PRECISION NOT NULL,
    "fixedSupply" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Token_ath" (
    "id" SERIAL NOT NULL,
    "price_date" TIMESTAMP(3) NOT NULL,
    "sysmbol" TEXT NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "logo_url" TEXT NOT NULL,
    "symbolId" INTEGER NOT NULL,

    CONSTRAINT "Token_ath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token_info" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "networks" TEXT NOT NULL,
    "totalSupply" DOUBLE PRECISION NOT NULL,
    "fixedSupply" BOOLEAN NOT NULL,

    CONSTRAINT "Token_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "btc_ath_aux_symbol_key" ON "btc_ath_aux"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Token_ath_symbolId_key" ON "Token_ath"("symbolId");

-- AddForeignKey
ALTER TABLE "Token_ath" ADD CONSTRAINT "Token_ath_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Token_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
