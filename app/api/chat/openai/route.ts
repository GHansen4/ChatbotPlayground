import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { createResponseMetadata, validateRequestBody } from "@/utils/apiHelpers";

// Initialize OpenAI client lazily to avoid build-time errors
const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, parameters } = validateRequestBody(body);

    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const startTime = Date.now();

    const completion = await openai.chat.completions.create({
      model: parameters.model || "gpt-4o",
      messages: [{ role: "user", content: message }],
      temperature: parameters.temperature || 0.7,
      max_tokens: parameters.maxTokens || 1000,
      top_p: parameters.topP || 1.0,
      frequency_penalty: parameters.frequencyPenalty || 0,
      presence_penalty: parameters.presencePenalty || 0,
    });

    const endTime = Date.now();

    const metadata = createResponseMetadata(
      startTime,
      endTime,
      completion.usage,
      completion.model,
      "openai"
    );

    return NextResponse.json({
      response: completion.choices[0]?.message?.content || "",
      metadata,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to generate response";
    const isValidationError = errorMessage.includes("required") || errorMessage.includes("must be");
    
    return NextResponse.json(
      { error: errorMessage },
      { status: isValidationError ? 400 : 500 }
    );
  }
}
