-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('Pending', 'Rejected', 'Accepted');

-- DropEnum
DROP TYPE "OrderType";

-- DropEnum
DROP TYPE "WorkoutTime";

-- CreateTable
CREATE TABLE "requests" (
    "request_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "initiator_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "RequestStatus" NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("request_id")
);
