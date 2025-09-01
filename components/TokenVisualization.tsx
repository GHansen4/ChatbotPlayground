"use client";

import React from "react";
import { encode, decode } from "gpt-tokenizer";

interface TokenVisualizationProps {
  text: string;
  model?: string;
}

interface TokenInfo {
  content: string;
  index: number;
  type: "word" | "punctuation" | "space" | "number" | "special";
}

const getTokenType = (token: string): TokenInfo["type"] => {
  if (!token || token.trim() === "") return "space";
  if (/^\d+$/.test(token.trim())) return "number";
  if (/^[.,!?;:'"()\[\]{}]$/.test(token.trim())) return "punctuation";
  if (/^[<>|@#$%^&*+=~`]/.test(token.trim())) return "special";
  return "word";
};

const getTokenColor = (type: TokenInfo["type"]): string => {
  switch (type) {
    case "word":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "punctuation":
      return "bg-red-100 text-red-800 border-red-200";
    case "space":
      return "bg-gray-100 text-gray-600 border-gray-200";
    case "number":
      return "bg-green-100 text-green-800 border-green-200";
    case "special":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getModelInfo = (model?: string) => {
  const modelMap: Record<string, { name: string; accurate: boolean }> = {
    "gpt-4o": { name: "GPT-4o", accurate: true },
    "gpt-4o-mini": { name: "GPT-4o Mini", accurate: true },
    "gpt-4-turbo": { name: "GPT-4 Turbo", accurate: true },
    "gpt-4": { name: "GPT-4", accurate: true },
    "gpt-3.5-turbo": { name: "GPT-3.5 Turbo", accurate: true },
    "claude-sonnet-4-20250514": { name: "Claude Sonnet 4", accurate: false },
    "claude-3-5-sonnet-20241022": { name: "Claude 3.5 Sonnet", accurate: false },
    "claude-3-5-haiku-20241022": { name: "Claude 3.5 Haiku", accurate: false },
    "claude-3-opus-20240229": { name: "Claude 3 Opus", accurate: false },
  };
  
  return modelMap[model || ""] || { name: "Unknown Model", accurate: false };
};

export default function TokenVisualization({ text, model }: TokenVisualizationProps) {
  if (!text.trim()) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-sm text-gray-500 text-center">
          Enter some text to see token breakdown
        </div>
      </div>
    );
  }

  try {
    // Tokenize the text using GPT tokenizer
    const tokenIds = encode(text);
    const modelInfo = getModelInfo(model);
    
    // Decode each token individually to show the breakdown
    const tokens: TokenInfo[] = tokenIds.map((tokenId, index) => {
      try {
        const content = decode([tokenId]);
        return {
          content,
          index,
          type: getTokenType(content),
        };
      } catch (error) {
        return {
          content: `[Token ${tokenId}]`,
          index,
          type: "special" as const,
        };
      }
    });

    const tokenCounts = tokens.reduce((acc, token) => {
      acc[token.type] = (acc[token.type] || 0) + 1;
      return acc;
    }, {} as Record<TokenInfo["type"], number>);

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">Token Breakdown</span>
            <span className="text-xs text-gray-600">
              ({tokens.length} token{tokens.length !== 1 ? "s" : ""})
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {modelInfo.name} {!modelInfo.accurate && "(approximate)"}
          </div>
        </div>

        {/* Token Statistics */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
          {Object.entries(tokenCounts).map(([type, count]) => (
            <span
              key={type}
              className={`px-2 py-1 rounded ${getTokenColor(type as TokenInfo["type"])} opacity-75`}
            >
              {type}: {count}
            </span>
          ))}
        </div>

        {/* Token Visualization */}
        <div className="flex flex-wrap gap-1">
          {tokens.map((token, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-sm rounded border cursor-help transition-all duration-150 hover:scale-105 hover:shadow-sm ${getTokenColor(token.type)}`}
              title={`Token ${index + 1} (${token.type}): "${token.content}"`}
            >
              {token.content === " " ? "·" : 
               token.content === "\n" ? "↵" :
               token.content === "\t" ? "→" :
               token.content || "∅"}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-2">Legend:</div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></span>
              Words
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-red-100 border border-red-200"></span>
              Punctuation
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-100 border border-green-200"></span>
              Numbers
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></span>
              Spaces
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-purple-100 border border-purple-200"></span>
              Special
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            · = space, ↵ = newline, → = tab, ∅ = empty token
          </div>
        </div>

        {/* Accuracy Disclaimer */}
        {!modelInfo.accurate && (
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
            <strong>Note:</strong> This tokenization is approximate for {modelInfo.name}. 
            Actual tokenization may differ as Claude uses a different tokenizer than GPT models.
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="text-sm text-red-600">
          Error tokenizing text: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }
}
