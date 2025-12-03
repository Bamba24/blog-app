/*
  Warnings:

  - Added the required column `AuteurId` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "AuteurId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_AuteurId_fkey" FOREIGN KEY ("AuteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
