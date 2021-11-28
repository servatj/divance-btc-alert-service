/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Btc` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Btc_symbol_key" ON "Btc"("symbol");
