"use client";

import React, { useState } from "react";
import { ButtonGeneratePRD } from "../atoms/ButtonGeneratePRD";
import { PRDStatusIndicator, PRDStatus } from "../molecules/PRDStatusIndicator";

interface PRDGenerationSectionProps {
  initialStatus?: PRDStatus;
  onGeneratePRD?: () => Promise<void>;
}

export const PRDGenerationSection: React.FC<PRDGenerationSectionProps> = ({
  initialStatus = "pending",
  onGeneratePRD,
}) => {
  const [status, setStatus] = useState<PRDStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePRD = async () => {
    if (isLoading || status === "completed") return;

    setIsLoading(true);
    setStatus("in-progress");

    try {
      if (onGeneratePRD) {
        await onGeneratePRD();
      } else {
        // Mock delay for demo purposes - would be removed in actual implementation
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus("completed");
    } catch (error) {
      // In case of error, revert to pending
      setStatus("pending");
      console.error("Error generating PRD:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
        Product Requirements Document (PRD)
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Generates a PRD based on your BRD. This document will translate business
        requirements into detailed product specifications for development.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ButtonGeneratePRD
          onClick={handleGeneratePRD}
          disabled={isLoading || status === "completed"}
          label={status === "completed" ? "PRD Generated" : "Generate PRD"}
        />
        <PRDStatusIndicator status={status} />
      </div>
    </div>
  );
};

export default PRDGenerationSection;
