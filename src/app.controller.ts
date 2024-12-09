import { BadRequestException, Controller, Get, InternalServerErrorException, Query } from "@nestjs/common";
import { AppService } from "./app.service.js";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("invoke")
  async invoke(@Query("query") query: string): Promise<string> {
    if (!query) {
      throw new BadRequestException("Query parameter is required.");
    }

    try {
      const result = await this.appService.handleQuery(query);
      return `Response: ${result.response}. Reasoning: ${result.reasoning}`;
    } catch (error) {
      console.error("Error in /invoke route:", error);
      throw new InternalServerErrorException("An error occurred while processing your request.");
    }
  }
}

