import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

import { HealthController } from "./controller/health-controller";
import { SongsController } from "./controller/songs-controller";
import { PrismaService } from "./injectable/prisma-service";
import { SongImportService } from "./injectable/songImportService";
import { SongsService } from "./injectable/songsService";

const { combine, timestamp, prettyPrint, colorize, errors } = winston.format;

@Module({
  imports: [
    WinstonModule.forRoot({
      format: combine(
        errors({ stack: true }),
        colorize(),
        timestamp(),
        prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          consoleWarnLevels: ["emerg", "alert", "crit", "error"],
          level: "error",
        }),
      ],
    }),
  ],
  providers: [PrismaService, SongImportService, SongsService],
  controllers: [HealthController, SongsController],
})
export class AppModule {}
