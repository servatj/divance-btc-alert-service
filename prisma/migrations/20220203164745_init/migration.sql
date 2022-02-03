/*
  Warnings:

  - You are about to drop the column `symbol` on the `Token_ath` table. All the data in the column will be lost.
  - You are about to drop the column `logo_url` on the `btc_ath` table. All the data in the column will be lost.
  - Added the required column `symbol` to the `Token_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token_ath" DROP COLUMN "symbol";

-- AlterTable
ALTER TABLE "Token_info" ADD COLUMN     "symbol" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "btc_ath" DROP COLUMN "logo_url";
