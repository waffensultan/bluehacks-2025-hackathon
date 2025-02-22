/*
  Warnings:

  - Added the required column `baranggayId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "baranggayId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "baranggays" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "baranggays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_baranggayId_fkey" FOREIGN KEY ("baranggayId") REFERENCES "baranggays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
