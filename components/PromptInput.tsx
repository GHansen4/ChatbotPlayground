"use client";

import React, { useState } from "react";
import TokenVisualization from "./TokenVisualization";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  loading: boolean;
  currentModels?: {
    panelA: string;
    panelB: string;
  };
}

export default function PromptInput({
  value,
  onChange,
  onGenerate,
  loading,
  currentModels,
}: PromptInputProps) {
  const [showTokens, setShowTokens] = useState(false);
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
        Prompt
      </label>
      <div className="space-y-4">
        <textarea
          id="prompt"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              if (value.trim() && !loading) {
                onGenerate();
              }
            }
          }}
          placeholder="Enter your prompt to compare AI responses... (Ctrl/Cmd + Enter to generate)"
          className="input-field resize-none h-32"
          disabled={loading}
          aria-describedby="prompt-help"
        />
        <div className="flex items-center justify-between">
          <p id="prompt-help" className="text-xs text-gray-500">
            Tip: Press Ctrl/Cmd + Enter to quickly generate responses
          </p>
          <button
            onClick={() => setShowTokens(!showTokens)}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition-colors"
            disabled={loading}
          >
            {showTokens ? "Hide Tokens" : "Show Tokens"}
          </button>
        </div>
        
        {/* Token Visualization */}
        {showTokens && (
          <TokenVisualization 
            text={value} 
            model={currentModels?.panelA} // Show tokens for Panel A model by default
          />
        )}
        
        <div className="flex justify-center">
          <button
            onClick={onGenerate}
            disabled={!value.trim() || loading}
            className="button-primary flex items-center gap-2 px-6 py-3 text-lg"
          >
            {loading ? (
              <>
                <div className="loading-spinner" />
                Generating...
              </>
            ) : (
              "Generate Responses"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
