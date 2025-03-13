"use client";

import React, { useState, useCallback } from "react";
import ErrorRetryPrompt from "../molecules/ErrorRetryPrompt";
import { toast } from "../atoms/ToastNotifications";

interface OperationInfo {
  name: string;
  description?: string;
}

interface OperationRetryFlowProps {
  operationInfo: OperationInfo;
  onRetry: () => Promise<void>;
  onCancel?: () => void;
  maxRetryAttempts?: number;
  initialError?: string;
  onMaxRetriesReached?: () => void;
}

/**
 * OperationRetryFlow component that manages retrying operations when they fail.
 * It tracks retry attempts, provides feedback, and handles error messaging.
 */
const OperationRetryFlow: React.FC<OperationRetryFlowProps> = ({
  operationInfo,
  onRetry,
  onCancel,
  maxRetryAttempts = 3,
  initialError,
  onMaxRetriesReached,
}) => {
  const [retryAttempts, setRetryAttempts] = useState<number>(0);
  const [error, setError] = useState<string | null>(initialError || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRetry = useCallback(async () => {
    if (retryAttempts >= maxRetryAttempts) {
      onMaxRetriesReached?.();
      return;
    }

    setIsLoading(true);
    try {
      await onRetry();
      setError(null);
      toast.success(`${operationInfo.name} completed successfully!`);
    } catch (err) {
      const newAttemptCount = retryAttempts + 1;
      setRetryAttempts(newAttemptCount);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );

      if (newAttemptCount >= maxRetryAttempts) {
        toast.error(
          `Maximum retry attempts reached for ${operationInfo.name.toLowerCase()}.`,
        );
        onMaxRetriesReached?.();
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    retryAttempts,
    maxRetryAttempts,
    onRetry,
    onMaxRetriesReached,
    operationInfo.name,
  ]);

  const handleCancel = useCallback(() => {
    setError(null);
    onCancel?.();
  }, [onCancel]);

  if (!error) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="mb-2">
        <h3 className="text-lg font-medium">{operationInfo.name}</h3>
        {operationInfo.description && (
          <p className="text-sm text-gray-600">{operationInfo.description}</p>
        )}
      </div>

      <ErrorRetryPrompt
        errorMessage={error}
        onRetry={handleRetry}
        onCancel={handleCancel}
        retryAttempts={retryAttempts}
        maxRetryAttempts={maxRetryAttempts}
      />

      {isLoading && (
        <div className="mt-2 text-sm text-blue-600 flex items-center">
          <div className="mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          Retrying operation...
        </div>
      )}
    </div>
  );
};

export default OperationRetryFlow;
