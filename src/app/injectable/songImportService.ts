import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as csvParser from "csv-parser";
import { PrismaService } from "./prisma-service";
import { Song, SongInput } from "app/types/commonTypes";

@Injectable()
export class SongImportService implements OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Runs automatically when the application starts.
   * Looks for a CSV file named "song_list*.csv" inside the /rawData folder
   * and imports its content into the database.
   */
  async onApplicationBootstrap() {
    const folderPath = path.join(__dirname, "..", "rawData");

    const files = fs.readdirSync(folderPath);

    // Try to find the song_list CSV file (case-insensitive).
    const songFile = files.find(
      (file) =>
        file.toLowerCase().includes("song_list") &&
        file.toLowerCase().endsWith(".csv"),
    );

    if (songFile) {
      const filePath = path.join(folderPath, songFile);
      console.log(`Found ${songFile}, starting import...`);
      await this.importSongs(filePath);
    } else {
      console.log("No song_list CSV file found, skipping import.");
    }
  }

  /**
   * Reads a CSV file containing songs and inserts them into the database.
   * - Expects CSV headers: "Song Name;Band;Year"
   * - Transforms them into lowercase before saving.
   * - Skips duplicates automatically (handled by Prisma).
   */
  private async importSongs(filePath: string) {
    return new Promise<void>((resolve, reject) => {
      const songs: Song[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser({ separator: ";" }))
        .on("data", (row: SongInput) => {
          const transformedData = {
            title: (row["Song Name"] || "").toLowerCase(),
            artist: (row["Band"] || "").toLowerCase(),
            year: parseInt(row["Year"] || 2042, 10),
          };
          songs.push(transformedData);
        })
        .on("end", async () => {
          try {
            await this.prisma.songs.createMany({
              data: songs,
              skipDuplicates: true,
            });
            console.log(`Imported ${songs.length} songs`);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on("error", reject);
    });
  }
}
