/*
  Warnings:

  - You are about to drop the column `halllId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `hotelId` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the `_ActivityToDay` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dayId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hallId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_halllId_fkey";

-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Hall" DROP CONSTRAINT "Hall_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToDay" DROP CONSTRAINT "_ActivityToDay_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToDay" DROP CONSTRAINT "_ActivityToDay_B_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "halllId",
ADD COLUMN     "dayId" INTEGER NOT NULL,
ADD COLUMN     "hallId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "hotelId";

-- DropTable
DROP TABLE "_ActivityToDay";

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "Hall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
