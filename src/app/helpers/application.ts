import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as passport from "passport";

import { AppModule } from "../app-module";

export async function getApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix("v1");
  app.enableCors();
  app.use(passport.initialize());

  return app;
}
