"use client";

import React from "react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

export default function PromptInput({
  value,
  onChange,
  onGenerate,
  loading,
}: PromptInputProps) {
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
        <p id="prompt-help" className="text-xs text-gray-500 mt-1">
          Tip: Press Ctrl/Cmd + Enter to quickly generate responses
        </p>
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
