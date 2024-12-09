import { DynamicStructuredTool } from "@langchain/core/tools";
import * as fs from "fs";
import { RunnableConfig } from "@langchain/core/runnables";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { SystemMessage } from "@langchain/core/messages";
import { llm } from "./supervisor.agent.js";
import { AgentState } from "../state/agent.state.js";
import { HumanMessage } from "@langchain/core/messages";
import { z } from 'zod';
import { END } from "@langchain/langgraph";
const CART_FILE = "cart.json";

const cartManagerTool = new DynamicStructuredTool({
  name: "cart_manager",
  description: "Manage a shopping cart with actions like add, remove, and list products.",
  schema: z.object({
    action: z.enum(["add", "remove", "list"]),
    product: z
      .object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      })
      .optional(),
  }),
  func: async ({ action, product }) => {
    let cart = JSON.parse(
      fs.existsSync(CART_FILE) ? fs.readFileSync(CART_FILE, "utf8") : "[]"
    );

    if (action === "add" && product) {
      cart.push(product);
    } else if (action === "remove" && product) {
      cart = cart.filter((p: any) => p.id !== product.id);
    } else if (action === "list") {
      return cart.map((p: any) => `${p.name} - ${p.url}`).join(", ");
    }

    fs.writeFileSync(CART_FILE, JSON.stringify(cart));
    return "Cart updated successfully.";
  },
});

const cartManagerAgent = createReactAgent({
  llm,
  tools: [cartManagerTool],
  stateModifier: new SystemMessage("You excel at manging add, remove and list operations on cart.json file. Use the researcher's information to add new records, use supervisors information to remove, and show.")
})

export const cartManagerNode = async (
  state: typeof AgentState.State,
  config?: RunnableConfig,
) => {
  if (state.messages.some((msg) => (msg.content as string).includes("Unable to retrieve")))
  {
    return {
      messages: [
        new HumanMessage({
          content: "Could not add anything to the cart as the required details are unavailable.",
          name: "CartManager",
        }),
      ],
      next: END,
    };
  }

  const result = await cartManagerAgent.invoke(state, config);
  return result;
};
