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
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
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
            error ? "border-red-500" : "border-gray-300"
          } px-3 py-2 pr-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        />
        <button
          type="button"
          onClick={toggleShowKey}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label={showKey ? "Hide API key" : "Show API key"}
        >
          {showKey ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputApiKey;
