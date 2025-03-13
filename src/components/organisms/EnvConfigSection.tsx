"use client";

import React, { useState } from "react";
import { EnvTable, EnvVariable } from "../molecules/EnvTable";
import { FileText, Save, CheckCircle } from "lucide-react";

interface EnvConfigSectionProps {
  initialVariables?: EnvVariable[];
  onSaveEnv: (variables: EnvVariable[]) => Promise<void>;
}

export const EnvConfigSection: React.FC<EnvConfigSectionProps> = ({
  initialVariables = [],
  onSaveEnv,
}) => {
  const [variables, setVariables] = useState<EnvVariable[]>(initialVariables);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleVariableChange = (index: number, newValue: string) => {
    const updatedVariables = [...variables];
    updatedVariables[index] = {
      ...updatedVariables[index],
      value: newValue,
    };
    setVariables(updatedVariables);
    setSaveSuccess(false);
  };

  const handleAddVariable = () => {
    setVariables([
      ...variables,
      { name: `ENV_VAR_${variables.length + 1}`, value: "" },
    ]);
    setSaveSuccess(false);
  };

  const handleSaveEnv = async () => {
    setIsLoading(true);
    setError(null);
    setSaveSuccess(false);

    try {
      await onSaveEnv(variables);
      setSaveSuccess(true);
    } catch (err) {
      setError("Failed to save environment variables. Please try again.");
      console.error("Error saving .env file:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <FileText className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Environment Variables</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Configure your project's environment variables. These will be stored in
        a .env file at the root of your project. Sensitive variables like API
        keys and passwords will be masked in the UI.
      </p>

      {saveSuccess && (
        <div className="mb-6 bg-green-50 p-4 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700">
            Environment variables have been saved to .env file
          </span>
        </div>
      )}

      <EnvTable variables={variables} onVariableChange={handleVariableChange} />

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleAddVariable}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Variable
        </button>

        <button
          onClick={handleSaveEnv}
          disabled={isLoading || variables.length === 0}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save .env
            </>
          )}
        </button>
      </div>

      {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Important Note</h3>
        <p className="text-gray-600 text-sm mt-1">
          Environment variables contain sensitive information. Never commit your
          .env file to version control. The .env file is automatically added to
          .gitignore for your protection.
        </p>
      </div>
    </section>
  );
};

export default EnvConfigSection;
