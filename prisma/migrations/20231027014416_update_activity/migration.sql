/*
  Warnings:

  - You are about to drop the column `hotelId` on the `Day` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Hall" DROP CONSTRAINT "Hall_hotelId_fkey";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "hotelId";
