-- CreateTable
CREATE TABLE "btc_ath" (
    "price_date" TIMESTAMP(3) NOT NULL,
    "symbol" TEXT NOT NULL,
    "high" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "btc_ath_price_date_key" ON "btc_ath"("price_date");

-- CreateIndex
CREATE UNIQUE INDEX "btc_ath_symbol_key" ON "btc_ath"("symbol");
