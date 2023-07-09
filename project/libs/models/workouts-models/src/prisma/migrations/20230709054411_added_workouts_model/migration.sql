/*
  Warnings:

  - Added the required column `backgroundImage` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "backgroundImage" TEXT NOT NULL;
