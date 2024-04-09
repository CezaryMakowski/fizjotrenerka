/*
  Warnings:

  - You are about to drop the column `src` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "src",
DROP COLUMN "type";

-- DropEnum
DROP TYPE "ProductType";

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
