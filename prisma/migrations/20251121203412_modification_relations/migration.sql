/*
  Warnings:

  - You are about to drop the column `AuteurId` on the `articles` table. All the data in the column will be lost.
  - Added the required column `auteurId` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."articles" DROP CONSTRAINT "articles_AuteurId_fkey";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "AuteurId",
ADD COLUMN     "auteurId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
