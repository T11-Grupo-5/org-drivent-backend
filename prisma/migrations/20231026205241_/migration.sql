/*
  Warnings:

  - You are about to drop the column `DayId` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_DayId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "DayId";

-- CreateTable
CREATE TABLE "_ActivityToDay" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToDay_AB_unique" ON "_ActivityToDay"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToDay_B_index" ON "_ActivityToDay"("B");

-- AddForeignKey
ALTER TABLE "_ActivityToDay" ADD CONSTRAINT "_ActivityToDay_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToDay" ADD CONSTRAINT "_ActivityToDay_B_fkey" FOREIGN KEY ("B") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
