import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma-service";
import { Song } from "app/types/commonTypes";

@Injectable()
export class SongsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllSongs(): Promise<Song[]> {
    try {
      const songs = await this.prismaService.songs.findMany({});
      return songs;
    } catch (error) {
      console.error("Error occured while trying to get all songs", error);
      return [];
    }
  }
}
