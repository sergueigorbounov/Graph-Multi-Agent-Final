import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { graph } from "./workflow/workflow.js";
import { HumanMessage } from "@langchain/core/messages";

@Injectable()
export class AppService {
  async handleQuery(query: string): Promise<{ response: string; reasoning: string }> {
    if (!query || typeof query !== 'string') {
      throw new BadRequestException("Query must be a non-empty string.");
    }

    try {
      const streamResults = await graph.stream({
        messages: [new HumanMessage({ content: query })],
      });

      let response = "Workflow completed.";
      let reasoning = "No reasoning provided.";

      for await (const output of streamResults) {
        if (output?.messages) {
          response = output.messages[output.messages.length - 1]?.content || "No response.";
          if (output.reasoning) {
            reasoning = output.reasoning;
          }
        }
      }

      return { response, reasoning };
    } catch (error) {
      console.error("Error in handleQuery:", error);
      throw new InternalServerErrorException("Failed to process query.");
    }
  }
}
