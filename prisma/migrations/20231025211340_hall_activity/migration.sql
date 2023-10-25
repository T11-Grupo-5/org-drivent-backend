/*
  Warnings:

  - You are about to drop the column `hotelId` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `halllId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_hotelId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "hotelId",
ADD COLUMN     "halllId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_halllId_fkey" FOREIGN KEY ("halllId") REFERENCES "Hall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
