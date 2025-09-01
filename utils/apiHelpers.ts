import { ModelParameters, ResponseMetadata } from "@/types";
import { TOKEN_COSTS } from "@/constants";

export function calculateCost(
  provider: "openai" | "anthropic",
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  // Simplified approach to avoid TypeScript complexity
  if (provider === "openai") {
    const openaiCosts = TOKEN_COSTS.openai;
    const modelCost = openaiCosts[model as keyof typeof openaiCosts] || openaiCosts["gpt-4o"];
    return (inputTokens / 1000) * modelCost.input + (outputTokens / 1000) * modelCost.output;
  } else {
    const anthropicCosts = TOKEN_COSTS.anthropic;
    const modelCost = anthropicCosts[model as keyof typeof anthropicCosts] || anthropicCosts["claude-sonnet-4-20250514"];
    return (inputTokens / 1000) * modelCost.input + (outputTokens / 1000) * modelCost.output;
  }
}

export function createResponseMetadata(
  startTime: number,
  endTime: number,
  usage: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; input_tokens?: number; output_tokens?: number } | undefined,
  model: string,
  provider: "openai" | "anthropic"
): ResponseMetadata {
  const responseTime = endTime - startTime;
  
  // Handle different token count structures between providers
  const inputTokens = usage?.prompt_tokens || usage?.input_tokens || 0;
  const outputTokens = usage?.completion_tokens || usage?.output_tokens || 0;
  const totalTokens = usage?.total_tokens || inputTokens + outputTokens;

  return {
    responseTime,
    tokenCount: totalTokens,
    inputTokens,
    outputTokens,
    estimatedCost: parseFloat(calculateCost(provider, model, inputTokens, outputTokens).toFixed(4)),
    model,
    provider: provider === "openai" ? "OpenAI" : "Anthropic",
  };
}

export function validateRequestBody(body: any): { message: string; parameters: ModelParameters } {
  if (!body.message || typeof body.message !== "string") {
    throw new Error("Message is required and must be a string");
  }

  if (!body.parameters || typeof body.parameters !== "object") {
    throw new Error("Parameters are required and must be an object");
  }

  return {
    message: body.message.trim(),
    parameters: body.parameters,
  };
}
