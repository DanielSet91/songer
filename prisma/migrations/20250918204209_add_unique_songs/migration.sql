/*
  Warnings:

  - A unique constraint covering the columns `[title,artist,year]` on the table `Songs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Songs_title_artist_year_key" ON "Songs"("title", "artist", "year");
