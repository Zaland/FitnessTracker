-- CreateTable
CREATE TABLE "Weight" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isTypePounds" BOOLEAN NOT NULL DEFAULT true,
    "logDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
