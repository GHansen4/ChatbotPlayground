"use client";

import React, { useState } from "react";
import { ParameterConfig } from "@/types";
import { InfoIcon } from "./Icons";

interface ParameterInputProps {
  config: ParameterConfig;
  value: string | number;
  onChange: (value: string | number) => void;
  isDifferent: boolean;
  disabled: boolean;
}

export default React.memo(function ParameterInput({
  config,
  value,
  onChange,
  isDifferent,
  disabled,
}: ParameterInputProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const baseClass = "relative " + (isDifferent ? "different" : "");

  const renderInput = () => {
    switch (config.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-field"
            disabled={disabled}
          >
            {config.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "slider":
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={value}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="slider-field"
              disabled={disabled}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{config.min}</span>
              <span className="font-medium">{value}</span>
              <span>{config.max}</span>
            </div>
          </div>
        );

      case "number":
        return (
          <input
            type="number"
            min={config.min}
            max={config.max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="input-field"
            disabled={disabled}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={baseClass}>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">
          {config.label}
        </label>
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
          {showTooltip && (
            <div className="tooltip visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-64">
              {config.tooltip}
            </div>
          )}
        </div>
        {isDifferent && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Different
          </span>
        )}
      </div>
      {renderInput()}
    </div>
  );
});
