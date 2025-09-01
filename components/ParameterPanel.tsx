"use client";

import React, { useState } from "react";
import { ModelParameters, PARAMETER_CONFIGS, OPENAI_MODELS, ANTHROPIC_MODELS } from "@/types";
import ParameterInput from "./ParameterInput";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/Icons";

interface ParameterPanelProps {
  panel: "A" | "B";
  provider: "openai" | "anthropic";
  parameters: ModelParameters;
  differences: Record<keyof ModelParameters, boolean>;
  onProviderChange: (provider: "openai" | "anthropic") => void;
  onParameterChange: (key: keyof ModelParameters, value: string | number) => void;
  onGenerate: () => void;
  loading: boolean;
  hasPrompt: boolean;
}

export default React.memo(function ParameterPanel({
  panel,
  provider,
  parameters,
  differences,
  onProviderChange,
  onParameterChange,
  onGenerate,
  loading,
  hasPrompt,
}: ParameterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const panelClass = panel === "A" ? "panel-a" : "panel-b";
  const panelColor = panel === "A" ? "blue" : "green";

  const modelOptions = provider === "openai" ? OPENAI_MODELS : ANTHROPIC_MODELS;

  return (
    <div className={`parameter-panel ${panelClass}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full bg-${panelColor}-500`} />
          <h3 className="text-lg font-semibold text-gray-900">
            Panel {panel}
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>

      {/* Provider Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Provider
        </label>
        <select
          value={provider}
          onChange={(e) => onProviderChange(e.target.value as "openai" | "anthropic")}
          className="input-field"
          disabled={loading}
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </div>

      {/* Parameters */}
      <div className={`collapsible-content ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="space-y-4">
          {PARAMETER_CONFIGS.map((config) => {
            const configWithOptions = config.key === "model" 
              ? { ...config, options: modelOptions }
              : config;

            return (
              <ParameterInput
                key={config.key}
                config={configWithOptions}
                value={parameters[config.key]}
                onChange={(value) => onParameterChange(config.key, value)}
                isDifferent={differences[config.key]}
                disabled={loading}
              />
            );
          })}

          <button
            onClick={onGenerate}
            disabled={!hasPrompt || loading}
            className={`w-full button-primary mt-6 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="loading-spinner" />
                Generating...
              </div>
            ) : (
              `Generate Panel ${panel}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
