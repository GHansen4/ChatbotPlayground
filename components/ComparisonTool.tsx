"use client";

import React, { useState, useCallback } from "react";
import { ComparisonState, ModelParameters, AIResponse } from "@/types";
import { debounce } from "@/utils/comparison";
import { useParameterComparison } from "@/hooks/useParameterComparison";
import { DEFAULT_OPENAI_PARAMS, DEFAULT_ANTHROPIC_PARAMS, API_CONFIG } from "@/constants";
import ParameterPanel from "./ParameterPanel";
import ResponseArea from "./ResponseArea";
import PromptInput from "./PromptInput";
import ErrorToast from "./ErrorToast";

export default function ComparisonTool() {
  const [state, setState] = useState<ComparisonState>({
    panelA: {
      provider: "openai",
      parameters: DEFAULT_OPENAI_PARAMS,
      loading: false,
    },
    panelB: {
      provider: "anthropic",
      parameters: DEFAULT_ANTHROPIC_PARAMS,
      loading: false,
    },
    prompt: "",
  });

  const [error, setError] = useState<string | null>(null);

  const debouncedParameterUpdate = useCallback(
    debounce((panel: "panelA" | "panelB", parameters: ModelParameters) => {
      setState(prev => ({
        ...prev,
        [panel]: {
          ...prev[panel],
          parameters,
        },
      }));
    }, API_CONFIG.DEBOUNCE_DELAY),
    []
  );

  const handleParameterChange = useCallback(
    (panel: "panelA" | "panelB", key: keyof ModelParameters, value: string | number) => {
      setState(prev => {
        const currentParams = prev[panel].parameters;
        const newParams = { ...currentParams, [key]: value };
        debouncedParameterUpdate(panel, newParams);
        return prev; // Return current state as debounced update will handle the actual update
      });
    },
    [debouncedParameterUpdate]
  );

  const handleProviderChange = useCallback(
    (panel: "panelA" | "panelB", provider: "openai" | "anthropic") => {
      const defaultParams = provider === "openai" ? DEFAULT_OPENAI_PARAMS : DEFAULT_ANTHROPIC_PARAMS;
      setState(prev => ({
        ...prev,
        [panel]: {
          ...prev[panel],
          provider,
          parameters: defaultParams,
        },
      }));
    },
    []
  );

  const handlePromptChange = useCallback((prompt: string) => {
    setState(prev => ({ ...prev, prompt }));
  }, []);

  const generateResponse = async (panel: "panelA" | "panelB") => {
    if (!state.prompt.trim()) return;

    setState(prev => ({
      ...prev,
      [panel]: {
        ...prev[panel],
        loading: true,
        response: undefined,
      },
    }));

    try {
      const response = await fetch(`/api/chat/${state[panel].provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: state.prompt,
          parameters: state[panel].parameters,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: AIResponse = await response.json();

      setState(prev => ({
        ...prev,
        [panel]: {
          ...prev[panel],
          loading: false,
          response: data,
        },
      }));
    } catch (error) {
      console.error(`Error generating response for ${panel}:`, error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate response";
      setError(`Panel ${panel}: ${errorMessage}`);
      
      setState(prev => ({
        ...prev,
        [panel]: {
          ...prev[panel],
          loading: false,
        },
      }));
    }
  };

  const generateBoth = async () => {
    await Promise.all([generateResponse("panelA"), generateResponse("panelB")]);
  };

  const parameterDifferences = useParameterComparison(
    state.panelA.parameters,
    state.panelB.parameters
  );

  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <PromptInput
        value={state.prompt}
        onChange={handlePromptChange}
        onGenerate={generateBoth}
        loading={state.panelA.loading || state.panelB.loading}
        currentModels={{
          panelA: state.panelA.parameters.model,
          panelB: state.panelB.parameters.model,
        }}
      />

      {/* Parameter Panels */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ParameterPanel
          panel="A"
          provider={state.panelA.provider}
          parameters={state.panelA.parameters}
          differences={parameterDifferences}
          onProviderChange={(provider) => handleProviderChange("panelA", provider)}
          onParameterChange={(key, value) => handleParameterChange("panelA", key, value)}
          onGenerate={() => generateResponse("panelA")}
          loading={state.panelA.loading}
          hasPrompt={!!state.prompt.trim()}
        />

        <ParameterPanel
          panel="B"
          provider={state.panelB.provider}
          parameters={state.panelB.parameters}
          differences={parameterDifferences}
          onProviderChange={(provider) => handleProviderChange("panelB", provider)}
          onParameterChange={(key, value) => handleParameterChange("panelB", key, value)}
          onGenerate={() => generateResponse("panelB")}
          loading={state.panelB.loading}
          hasPrompt={!!state.prompt.trim()}
        />
      </div>

      {/* Response Areas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ResponseArea
          panel="A"
          response={state.panelA.response}
          loading={state.panelA.loading}
          provider={state.panelA.provider}
        />

        <ResponseArea
          panel="B"
          response={state.panelB.response}
          loading={state.panelB.loading}
          provider={state.panelB.provider}
        />
      </div>

      {/* Error Toast */}
      {error && (
        <ErrorToast
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
