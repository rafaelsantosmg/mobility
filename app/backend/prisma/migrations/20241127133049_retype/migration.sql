/*
  Warnings:

  - You are about to drop the column `date` on the `ride` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ride" DROP COLUMN "date",
ALTER COLUMN "duration" SET DATA TYPE TEXT;
