"use client";

import React, { useState } from "react";
import { InputApiKey } from "../atoms/InputApiKey";

interface ApiKeyFormProps {
  onSaveKey: (apiKey: string) => void;
  initialValue?: string;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({
  onSaveKey,
  initialValue = "",
}) => {
  const [apiKey, setApiKey] = useState(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setError(undefined);
    setIsSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation - API keys often have a specific format
    // This is a simple check, but can be made more specific based on API provider
    if (!apiKey.trim()) {
      setError("API key is required");
      return;
    }

    if (apiKey.trim().length < 10) {
      setError("API key appears to be too short");
      return;
    }

    // Call the onSaveKey callback
    onSaveKey(apiKey);
    setIsSuccess(true);
    setError(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputApiKey
        label="API Key"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={handleChange}
        required
        error={error}
        name="apiKey"
      />

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={!apiKey.trim()}
        >
          Save Key
        </button>

        {isSuccess && (
          <p className="text-emerald-600 text-sm">
            API key saved successfully!
          </p>
        )}
      </div>
    </form>
  );
};

export default ApiKeyForm;
