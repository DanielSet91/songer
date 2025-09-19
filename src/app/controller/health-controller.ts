import { Controller, Get } from "@nestjs/common";

import { version } from "../../../package.json";

@Controller("/health-check")
export class HealthController {
  constructor() {}

  @Get()
  getVersion() {
    return {
      apiVersion: {
        version,
        status: "up",
        date: new Date(),
      },
    };
  }
}
