/*
  Warnings:

  - Added the required column `symbol` to the `Token_ath` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token_ath" ADD COLUMN     "symbol" TEXT NOT NULL;
