/*
  Warnings:

  - You are about to drop the column `userId` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_userId_fkey";

-- DropIndex
DROP INDEX "Btc_price_date_key";

-- DropIndex
DROP INDEX "Btc_symbol_key";

-- DropIndex
DROP INDEX "btc_ath_price_date_key";

-- DropIndex
DROP INDEX "btc_ath_symbol_key";

-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Btc" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Btc_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "btc_ath" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "btc_ath_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";
