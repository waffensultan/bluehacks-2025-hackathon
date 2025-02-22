/*
  Warnings:

  - Added the required column `baranggayId` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "baranggayId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_baranggayId_fkey" FOREIGN KEY ("baranggayId") REFERENCES "baranggays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
