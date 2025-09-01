"use client";

import React from "react";
import { AIResponse } from "@/types";
import { formatResponseTime, formatCost, formatTokenCount } from "@/utils/comparison";

interface ResponseAreaProps {
  panel: "A" | "B";
  response?: AIResponse;
  loading: boolean;
  provider: "openai" | "anthropic";
}

export default React.memo(function ResponseArea({
  panel,
  response,
  loading,
  provider,
}: ResponseAreaProps) {
  const panelColor = panel === "A" ? "blue" : "green";

  const formatResponse = (text: string) => {
    // Simple formatting to preserve line breaks and handle basic markdown
    return text
      .split("\n")
      .map((line, index) => {
        // Handle code blocks (simple detection)
        if (line.startsWith("```")) {
          return (
            <pre key={index} className="bg-gray-100 rounded-md p-2 my-2 overflow-x-auto">
              <code>{line.replace(/```\w*/, "")}</code>
            </pre>
          );
        }
        
        // Handle inline code
        if (line.includes("`")) {
          const parts = line.split("`");
          return (
            <p key={index} className="mb-2">
              {parts.map((part, i) => 
                i % 2 === 0 ? part : <code key={i}>{part}</code>
              )}
            </p>
          );
        }
        
        return line ? <p key={index} className="mb-2">{line}</p> : <br key={index} />;
      });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full bg-${panelColor}-500`} />
        <h3 className="text-lg font-semibold text-gray-900">
          Response {panel}
        </h3>
        <span className="text-sm text-gray-500 capitalize">
          ({provider})
        </span>
      </div>

      <div className={`response-area ${loading ? "loading" : ""}`}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4" />
              <p className="text-gray-500">Generating response...</p>
            </div>
          </div>
        ) : response ? (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              {formatResponse(response.response)}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Enter a prompt and generate to see the response</p>
          </div>
        )}
      </div>

      {response && (
        <div className="metadata-card">
          <h4 className="font-medium text-gray-700 mb-2">Response Metadata</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Response Time:</span>
              <span className="ml-2 font-medium">
                {formatResponseTime(response.metadata.responseTime)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Total Tokens:</span>
              <span className="ml-2 font-medium">
                {formatTokenCount(response.metadata.tokenCount)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Input Tokens:</span>
              <span className="ml-2 font-medium">
                {formatTokenCount(response.metadata.inputTokens)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Output Tokens:</span>
              <span className="ml-2 font-medium">
                {formatTokenCount(response.metadata.outputTokens)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Estimated Cost:</span>
              <span className="ml-2 font-medium">
                {formatCost(response.metadata.estimatedCost)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Model:</span>
              <span className="ml-2 font-medium">
                {response.metadata.model}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
