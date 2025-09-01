import { useState, useCallback } from "react";
import { AIResponse, ModelParameters } from "@/types";

interface UseAPICallResult {
  loading: boolean;
  error: string | null;
  response: AIResponse | null;
  makeRequest: (provider: "openai" | "anthropic", prompt: string, parameters: ModelParameters) => Promise<void>;
  clearError: () => void;
  clearResponse: () => void;
}

export function useAPICall(): UseAPICallResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const makeRequest = useCallback(async (
    provider: "openai" | "anthropic",
    prompt: string,
    parameters: ModelParameters
  ) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`/api/chat/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
          parameters,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      const data: AIResponse = await res.json();
      setResponse(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate response";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearResponse = useCallback(() => setResponse(null), []);

  return {
    loading,
    error,
    response,
    makeRequest,
    clearError,
    clearResponse,
  };
}
