/*
  Warnings:

  - You are about to drop the column `hotelId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Day` table. All the data in the column will be lost.
  - Added the required column `DayId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelId` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_activityId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "hotelId",
ADD COLUMN     "DayId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "activityId",
ADD COLUMN     "hotelId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_DayId_fkey" FOREIGN KEY ("DayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
