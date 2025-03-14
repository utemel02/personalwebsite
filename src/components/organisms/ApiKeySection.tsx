"use client";

import React, { useState } from "react";
import { ApiKeyForm } from "../molecules/ApiKeyForm";
import { Key, CheckCircle } from "lucide-react";

interface ApiKeySectionProps {
  savedApiKey?: string;
  onSaveApiKey: (apiKey: string) => Promise<void>;
}

export const ApiKeySection: React.FC<ApiKeySectionProps> = ({
  savedApiKey = "",
  onSaveApiKey,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(!!savedApiKey);

  const handleSaveKey = async (apiKey: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await onSaveApiKey(apiKey);
      setHasKey(true);
    } catch (err) {
      setError("Failed to save API key. Please try again.");
      console.error("Error saving API key:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow-md p-6 max-w-xl mx-auto border border-amber-200 dark:border-stone-700">
      <div className="flex items-center mb-4">
        <Key className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-3" />
        <h2 className="text-xl font-semibold text-stone-800 dark:text-amber-50">
          Manage API Keys
        </h2>
      </div>

      <p className="text-stone-600 dark:text-amber-200 mb-6">
        Your API key is securely stored and used for authentication with
        external services. Keep this key private and never share it publicly.
      </p>

      {hasKey && (
        <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-md flex items-center border border-emerald-200 dark:border-emerald-800">
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
          <span className="text-emerald-700 dark:text-emerald-300">
            API key has been saved and is ready to use
          </span>
        </div>
      )}

      <ApiKeyForm onSaveKey={handleSaveKey} initialValue={savedApiKey} />

      {error && (
        <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mt-4 flex items-center text-stone-600 dark:text-amber-300 text-sm">
          <div className="mr-2 h-4 w-4 border-2 border-amber-600 dark:border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          Saving API key...
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-amber-200 dark:border-stone-700">
        <h3 className="text-sm font-medium text-stone-700 dark:text-amber-100">
          Important Note
        </h3>
        <p className="text-stone-600 dark:text-amber-200 text-sm mt-1">
          If you refresh or reset your API key, you'll need to update it here.
          The key is encrypted when stored and never exposed in client-side
          code.
        </p>
      </div>
    </section>
  );
};

export default ApiKeySection;
