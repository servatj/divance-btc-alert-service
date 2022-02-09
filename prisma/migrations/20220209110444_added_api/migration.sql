/*
  Warnings:

  - Added the required column `api` to the `Token_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token_info" ADD COLUMN "api" VARCHAR(200);
