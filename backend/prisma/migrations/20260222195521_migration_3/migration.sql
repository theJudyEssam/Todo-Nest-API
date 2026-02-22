-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPRROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
