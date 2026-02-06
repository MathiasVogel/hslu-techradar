-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNIQUES', 'PLATFORMS', 'TOOLS', 'LANGUAGES_AND_FRAMEWORKS');

-- CreateEnum
CREATE TYPE "Ring" AS ENUM ('ADOPT', 'TRIAL', 'ASSESS', 'HOLD');

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "category" "Category" NOT NULL,
    "ring" "Ring" NOT NULL,
    "moved" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");
