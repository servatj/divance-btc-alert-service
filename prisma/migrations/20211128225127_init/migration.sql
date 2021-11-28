/*
  Warnings:

  - The primary key for the `Btc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Btc` table. All the data in the column will be lost.
  - The primary key for the `btc_ath` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `btc_ath` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[price_date,symbol]` on the table `Btc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[price_date,symbol]` on the table `btc_ath` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Btc" DROP CONSTRAINT "Btc_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "btc_ath" DROP CONSTRAINT "btc_ath_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Btc_price_date_symbol_key" ON "Btc"("price_date", "symbol");

-- CreateIndex
CREATE UNIQUE INDEX "btc_ath_price_date_symbol_key" ON "btc_ath"("price_date", "symbol");
