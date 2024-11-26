/*
  Warnings:

  - You are about to drop the column `customerId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `Ride` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver_id` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DriverToRide" DROP CONSTRAINT "_DriverToRide_B_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_customerId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_driverId_fkey";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "customerId",
DROP COLUMN "driverId",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "driver_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Ride";

-- CreateTable
CREATE TABLE "ride" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driver_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "ride_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DriverToRide" ADD CONSTRAINT "_DriverToRide_B_fkey" FOREIGN KEY ("B") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE CASCADE;
