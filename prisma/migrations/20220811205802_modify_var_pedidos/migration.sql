/*
  Warnings:

  - You are about to drop the column `pedido` on the `Orden` table. All the data in the column will be lost.
  - Added the required column `pedidos` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "pedido",
ADD COLUMN     "pedidos" JSONB NOT NULL;
