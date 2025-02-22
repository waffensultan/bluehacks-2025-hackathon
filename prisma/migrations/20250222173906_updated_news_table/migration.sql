/*
  Warnings:

  - You are about to drop the column `name` on the `news` table. All the data in the column will be lost.
  - Added the required column `content` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" DROP COLUMN "name",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
