/*
  Warnings:

  - Changed the type of `time` on the `workouts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `workouts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('Beginner', 'Amateur', 'Professional');

-- AlterTable
ALTER TABLE "workouts" DROP COLUMN "time",
ADD COLUMN     "time" TEXT NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" "UserLevel" NOT NULL;
