export interface ModelParameters {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export type Provider = "openai" | "anthropic";
export type PanelId = "panelA" | "panelB";
export type ParameterKey = keyof ModelParameters;

export interface ResponseMetadata {
  responseTime: number;
  tokenCount: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
  model: string;
  provider: string;
}

export interface AIResponse {
  response: string;
  metadata: ResponseMetadata;
}

export interface PanelState {
  provider: Provider;
  parameters: ModelParameters;
  response?: AIResponse;
  loading: boolean;
}

export interface ComparisonState {
  panelA: PanelState;
  panelB: PanelState;
  prompt: string;
}

export interface ParameterConfig {
  key: keyof ModelParameters;
  label: string;
  type: "select" | "slider" | "number";
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string | number; label: string }[];
  tooltip: string;
}

export const OPENAI_MODELS = [
  { value: "gpt-4o", label: "GPT-4o (Latest)" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
];

export const ANTHROPIC_MODELS = [
  { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4 (Latest)" },
  { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
  { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku" },
  { value: "claude-3-opus-20240229", label: "Claude 3 Opus" },
];

export const PARAMETER_CONFIGS: ParameterConfig[] = [
  {
    key: "model",
    label: "Model",
    type: "select",
    options: [], // Will be populated based on provider
    tooltip: "The AI model to use for generating responses",
  },
  {
    key: "temperature",
    label: "Temperature",
    type: "slider",
    min: 0,
    max: 2,
    step: 0.1,
    tooltip: "Controls randomness in output. Higher values make output more random, lower values more focused.",
  },
  {
    key: "maxTokens",
    label: "Max Tokens",
    type: "number",
    min: 1,
    max: 4000,
    tooltip: "Maximum number of tokens to generate in the response",
  },
  {
    key: "topP",
    label: "Top P",
    type: "slider",
    min: 0.1,
    max: 1,
    step: 0.1,
    tooltip: "Nucleus sampling parameter. Lower values focus on more probable tokens.",
  },
  {
    key: "frequencyPenalty",
    label: "Frequency Penalty",
    type: "slider",
    min: -2,
    max: 2,
    step: 0.1,
    tooltip: "Reduces likelihood of repeating tokens based on their frequency in the text so far.",
  },
  {
    key: "presencePenalty",
    label: "Presence Penalty",
    type: "slider",
    min: -2,
    max: 2,
    step: 0.1,
    tooltip: "Reduces likelihood of repeating any token that has appeared in the text so far.",
  },
];
