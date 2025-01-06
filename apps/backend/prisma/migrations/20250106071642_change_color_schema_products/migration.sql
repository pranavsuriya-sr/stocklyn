/*
  Warnings:

  - The `colors` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "colors",
ADD COLUMN     "colors" TEXT[];
