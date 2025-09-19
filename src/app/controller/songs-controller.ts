import { Controller, Get } from "@nestjs/common";
import { SongsService } from "../injectable/songsService";

@Controller("/songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get("/")
  async getAllSongs() {
    const songs = await this.songsService.getAllSongs();
    return { data: songs };
  }
}
