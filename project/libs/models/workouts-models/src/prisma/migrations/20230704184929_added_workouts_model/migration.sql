/*
  Warnings:

  - The values [Beginner] on the enum `UserLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserLevel_new" AS ENUM ('Amateur', 'Professional');
ALTER TABLE "workouts" ALTER COLUMN "level" TYPE "UserLevel_new" USING ("level"::text::"UserLevel_new");
ALTER TYPE "UserLevel" RENAME TO "UserLevel_old";
ALTER TYPE "UserLevel_new" RENAME TO "UserLevel";
DROP TYPE "UserLevel_old";
COMMIT;
