-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNIQUES', 'PLATFORMS', 'TOOLS', 'LANGUAGES_AND_FRAMEWORKS');

-- CreateEnum
CREATE TYPE "Ring" AS ENUM ('ADOPT', 'TRIAL', 'ASSESS', 'HOLD');

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "ring" "Ring",
    "description" TEXT NOT NULL,
    "justification" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");
