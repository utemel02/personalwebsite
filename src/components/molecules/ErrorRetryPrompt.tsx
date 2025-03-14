"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorRetryPromptProps {
  errorMessage: string;
  onRetry: () => void;
  onCancel?: () => void;
  retryAttempts?: number;
  maxRetryAttempts?: number;
}

/**
 * ErrorRetryPrompt component that asks if the user wants to retry an operation
 * after an error occurs. It shows the error message, retry attempts, and buttons
 * to retry or cancel.
 */
const ErrorRetryPrompt: React.FC<ErrorRetryPromptProps> = ({
  errorMessage,
  onRetry,
  onCancel,
  retryAttempts = 0,
  maxRetryAttempts = 3,
}) => {
  const hasReachedMaxAttempts = retryAttempts >= maxRetryAttempts;

  return (
    <div className="p-4 border border-red-400 rounded-md bg-red-50 dark:bg-red-900/10 flex flex-col gap-3">
      <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium">Operation Failed</h4>
          <p className="text-sm text-red-700 dark:text-red-300">
            {errorMessage}
          </p>

          {maxRetryAttempts > 0 && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Retry attempts: {retryAttempts} of {maxRetryAttempts}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm text-stone-600 border border-stone-300 rounded hover:bg-light dark:text-amber-100 dark:border-stone-600 dark:hover:bg-stone-700"
          >
            Cancel
          </button>
        )}

        <button
          onClick={onRetry}
          disabled={hasReachedMaxAttempts}
          className={`px-3 py-1 text-sm text-white rounded flex items-center gap-1 ${
            hasReachedMaxAttempts
              ? "bg-stone-400 cursor-not-allowed dark:bg-stone-600"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorRetryPrompt;
