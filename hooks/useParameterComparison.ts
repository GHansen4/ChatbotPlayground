import { useMemo } from "react";
import { ModelParameters } from "@/types";
import { compareParameters } from "@/utils/comparison";

export function useParameterComparison(
  paramsA: ModelParameters,
  paramsB: ModelParameters
) {
  return useMemo(
    () => compareParameters(paramsA, paramsB),
    [paramsA, paramsB]
  );
}
