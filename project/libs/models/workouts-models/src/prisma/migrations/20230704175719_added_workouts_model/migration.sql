-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('Beginner', 'Amateur', 'Professional');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('Yoga', 'Running', 'Boxing', 'Stretching', 'Crossfit', 'Aerobics', 'Pilates');

-- CreateEnum
CREATE TYPE "WorkoutTime" AS ENUM ('Short', 'Average', 'Long', 'ExtraLong');

-- CreateEnum
CREATE TYPE "WorkoutGender" AS ENUM ('Men', 'Women', 'Everybody');

-- CreateTable
CREATE TABLE "workouts" (
    "workout_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "level" "UserLevel" NOT NULL,
    "type" "WorkoutType" NOT NULL,
    "time" "WorkoutTime" NOT NULL,
    "price" INTEGER NOT NULL,
    "caloriesNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" "WorkoutGender" NOT NULL,
    "demonstration" TEXT,
    "rating" INTEGER DEFAULT 0,
    "coachId" TEXT NOT NULL,
    "specialOffer" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("workout_id")
);
