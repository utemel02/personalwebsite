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
    <section className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <Key className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Manage API Keys</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Your API key is securely stored and used for authentication with
        external services. Keep this key private and never share it publicly.
      </p>

      {hasKey && (
        <div className="mb-6 bg-green-50 p-4 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700">
            API key has been saved and is ready to use
          </span>
        </div>
      )}

      <ApiKeyForm onSaveKey={handleSaveKey} initialValue={savedApiKey} />

      {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      {isLoading && (
        <div className="mt-4 text-gray-600 text-sm">Saving API key...</div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Important Note</h3>
        <p className="text-gray-600 text-sm mt-1">
          If you refresh or reset your API key, you'll need to update it here.
          The key is encrypted when stored and never exposed in client-side
          code.
        </p>
      </div>
    </section>
  );
};

export default ApiKeySection;
