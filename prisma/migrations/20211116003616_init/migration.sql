-- CreateTable
CREATE TABLE "Btc" (
    "price_date" TIMESTAMP(3) NOT NULL,
    "symbol" TEXT NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Btc_price_date_key" ON "Btc"("price_date");
