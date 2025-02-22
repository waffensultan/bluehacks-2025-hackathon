/*
  Warnings:

  - You are about to drop the `volunteers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "volunteers";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isVolunteer" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
