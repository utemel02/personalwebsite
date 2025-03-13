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
    <div className="p-4 border border-danger rounded-md bg-danger-light/10 flex flex-col gap-3">
      <div className="flex items-start gap-2 text-danger">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium">Operation Failed</h4>
          <p className="text-sm text-danger-dark">{errorMessage}</p>

          {maxRetryAttempts > 0 && (
            <p className="text-xs text-danger mt-1">
              Retry attempts: {retryAttempts} of {maxRetryAttempts}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm text-neutral-600 border border-neutral-300 rounded hover:bg-neutral-50"
          >
            Cancel
          </button>
        )}

        <button
          onClick={onRetry}
          disabled={hasReachedMaxAttempts}
          className={`px-3 py-1 text-sm text-white rounded flex items-center gap-1 ${
            hasReachedMaxAttempts
              ? "bg-neutral-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark"
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
