-- CreateTable
CREATE TABLE "Songs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Songs_pkey" PRIMARY KEY ("id")
);
