import { ModelParameters } from "@/types";

// Default parameter configurations
export const DEFAULT_OPENAI_PARAMS: ModelParameters = {
  model: "gpt-4o",
  temperature: 0.7,
  maxTokens: 1000,
  topP: 1.0,
  frequencyPenalty: 0,
  presencePenalty: 0,
} as const;

export const DEFAULT_ANTHROPIC_PARAMS: ModelParameters = {
  model: "claude-sonnet-4-20250514",
  temperature: 0.7,
  maxTokens: 1000,
  topP: 1.0,
  frequencyPenalty: 0,
  presencePenalty: 0,
} as const;

// API configuration
export const API_CONFIG = {
  DEBOUNCE_DELAY: 300,
  DEFAULT_TIMEOUT: 30000,
  MAX_RETRIES: 3,
} as const;

// UI configuration
export const UI_CONFIG = {
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 300,
  TOOLTIP_DELAY: 500,
} as const;

// Cost estimation (per 1K tokens) - Updated January 2025
export const TOKEN_COSTS = {
  openai: {
    "gpt-4o": { input: 0.0025, output: 0.01 },
    "gpt-4o-mini": { input: 0.00015, output: 0.0006 },
    "gpt-4-turbo": { input: 0.01, output: 0.03 },
    "gpt-4": { input: 0.03, output: 0.06 },
    "gpt-3.5-turbo": { input: 0.0015, output: 0.002 },
  },
  anthropic: {
    "claude-sonnet-4-20250514": { input: 0.003, output: 0.015 },
    "claude-3-5-sonnet-20241022": { input: 0.003, output: 0.015 },
    "claude-3-5-haiku-20241022": { input: 0.00025, output: 0.00125 },
    "claude-3-opus-20240229": { input: 0.015, output: 0.075 },
    "claude-3-sonnet-20240229": { input: 0.003, output: 0.015 }, // Deprecated but kept for fallback
    "claude-3-haiku-20240307": { input: 0.00025, output: 0.00125 }, // Deprecated but kept for fallback
  },
} as const;
