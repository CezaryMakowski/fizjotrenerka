-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" TEXT,
ADD COLUMN     "frontPage" BOOLEAN NOT NULL DEFAULT false;
