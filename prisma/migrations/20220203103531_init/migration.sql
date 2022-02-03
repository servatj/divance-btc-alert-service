/*
  Warnings:

  - You are about to drop the column `sysmbol` on the `Token_ath` table. All the data in the column will be lost.
  - Added the required column `symbol` to the `Token_ath` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token_ath" DROP COLUMN "sysmbol",
ADD COLUMN     "symbol" TEXT NOT NULL;
