"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputApiKeyProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  error?: string;
}

export const InputApiKey: React.FC<InputApiKeyProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  name,
  error,
}) => {
  const [showKey, setShowKey] = useState(false);

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-neutral-800">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="relative">
        <input
          type={showKey ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border ${
            error ? "border-danger" : "border-neutral-300"
          } px-3 py-2 pr-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-light transition-all`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <button
          type="button"
          onClick={toggleShowKey}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          aria-label={showKey ? "Hide API key" : "Show API key"}
        >
          {showKey ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && (
        <p id={`${name}-error`} className="text-danger text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputApiKey;
