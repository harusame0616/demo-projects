/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "company_newsletter"."User_email_key";

-- AlterTable
ALTER TABLE "company_newsletter"."Post" ALTER COLUMN "postedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "company_newsletter"."PostComment" ADD COLUMN     "commentedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "company_newsletter"."PostLike" ADD COLUMN     "likedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "company_newsletter"."User" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "registeredAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
