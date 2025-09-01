import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// Initialize Anthropic client lazily to avoid build-time errors
const getAnthropic = () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return null;
  }
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
};

export async function POST(request: NextRequest) {
  try {
    const { message, parameters } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const anthropic = getAnthropic();
    if (!anthropic) {
      return NextResponse.json(
        { error: "Anthropic API key not configured" },
        { status: 500 }
      );
    }

    const startTime = Date.now();

    const completion = await anthropic.messages.create({
      model: parameters.model || "claude-sonnet-4-20250514",
      max_tokens: parameters.maxTokens || 1000,
      temperature: parameters.temperature || 0.7,
      top_p: parameters.topP || 1.0,
      messages: [{ role: "user", content: message }],
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Calculate estimated cost using centralized cost data
    const costs: Record<string, { input: number; output: number }> = {
      "claude-sonnet-4-20250514": { input: 0.003, output: 0.015 },
      "claude-3-5-sonnet-20241022": { input: 0.003, output: 0.015 },
      "claude-3-5-haiku-20241022": { input: 0.00025, output: 0.00125 },
      "claude-3-opus-20240229": { input: 0.015, output: 0.075 },
    };

    const modelCost = costs[parameters.model] || costs["claude-sonnet-4-20250514"];
    const inputTokens = completion.usage?.input_tokens || 0;
    const outputTokens = completion.usage?.output_tokens || 0;
    const estimatedCost = 
      (inputTokens / 1000) * modelCost.input + 
      (outputTokens / 1000) * modelCost.output;

    return NextResponse.json({
      response: completion.content[0]?.type === "text" ? completion.content[0].text : "",
      metadata: {
        responseTime,
        tokenCount: (completion.usage?.input_tokens || 0) + (completion.usage?.output_tokens || 0),
        inputTokens,
        outputTokens,
        estimatedCost: parseFloat(estimatedCost.toFixed(4)),
        model: completion.model,
        provider: "Anthropic",
      },
    });
  } catch (error) {
    console.error("Anthropic API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
