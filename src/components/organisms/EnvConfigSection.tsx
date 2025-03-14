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
    <section className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow-md p-6 max-w-4xl mx-auto border border-amber-200 dark:border-stone-700">
      <div className="flex items-center mb-4">
        <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-3" />
        <h2 className="text-xl font-semibold text-stone-800 dark:text-amber-50">
          Environment Variables
        </h2>
      </div>

      <p className="text-stone-600 dark:text-amber-200 mb-6">
        Configure your project's environment variables. These will be stored in
        a .env file at the root of your project. Sensitive variables like API
        keys and passwords will be masked in the UI.
      </p>

      {saveSuccess && (
        <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-md flex items-center border border-emerald-200 dark:border-emerald-800">
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
          <span className="text-emerald-700 dark:text-emerald-300">
            Environment variables have been saved to .env file
          </span>
        </div>
      )}

      <EnvTable variables={variables} onVariableChange={handleVariableChange} />

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleAddVariable}
          className="px-4 py-2 bg-white dark:bg-stone-900 border border-amber-300 dark:border-stone-600 text-stone-700 dark:text-amber-100 rounded-md hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-700 focus:ring-offset-2"
        >
          Add Variable
        </button>

        <button
          onClick={handleSaveEnv}
          disabled={isLoading || variables.length === 0}
          className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </span>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save .env
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-amber-200 dark:border-stone-700">
        <h3 className="text-sm font-medium text-stone-700 dark:text-amber-100">
          Important Note
        </h3>
        <p className="text-stone-600 dark:text-amber-200 text-sm mt-1">
          Environment variables contain sensitive information. Never commit your
          .env file to version control. The .env file is automatically added to
          .gitignore for your protection.
        </p>
      </div>
    </section>
  );
};

export default EnvConfigSection;
