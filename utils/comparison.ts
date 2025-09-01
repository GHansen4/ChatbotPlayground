import { ModelParameters } from "@/types";

export function compareParameters(
  paramsA: ModelParameters,
  paramsB: ModelParameters
): Record<keyof ModelParameters, boolean> {
  return {
    model: paramsA.model !== paramsB.model,
    temperature: Math.abs(paramsA.temperature - paramsB.temperature) > 0.01,
    maxTokens: paramsA.maxTokens !== paramsB.maxTokens,
    topP: Math.abs(paramsA.topP - paramsB.topP) > 0.01,
    frequencyPenalty: Math.abs(paramsA.frequencyPenalty - paramsB.frequencyPenalty) > 0.01,
    presencePenalty: Math.abs(paramsA.presencePenalty - paramsB.presencePenalty) > 0.01,
  };
}

export function formatResponseTime(milliseconds: number): string {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  }
  return `${(milliseconds / 1000).toFixed(1)}s`;
}

export function formatCost(cost: number): string {
  return `$${cost.toFixed(4)}`;
}

export function formatTokenCount(count: number): string {
  if (count > 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
