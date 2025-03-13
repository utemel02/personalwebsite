"use client";

import React, { useState } from "react";
import { ButtonGenerateBRD } from "../atoms/ButtonGenerateBRD";
import { BRDStatusIndicator, BRDStatus } from "../molecules/BRDStatusIndicator";

interface BRDGenerationSectionProps {
  initialStatus?: BRDStatus;
  onGenerateBRD?: () => Promise<void>;
}

export const BRDGenerationSection: React.FC<BRDGenerationSectionProps> = ({
  initialStatus = "pending",
  onGenerateBRD,
}) => {
  const [status, setStatus] = useState<BRDStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateBRD = async () => {
    if (isLoading || status === "completed") return;

    setIsLoading(true);
    setStatus("in-progress");

    try {
      if (onGenerateBRD) {
        await onGenerateBRD();
      } else {
        // Mock delay for demo purposes - would be removed in actual implementation
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus("completed");
    } catch (error) {
      // In case of error, revert to pending
      setStatus("pending");
      console.error("Error generating BRD:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
        Business Requirements Document (BRD)
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Click to generate a Business Requirements Document (BRD) from your
        project description. This document will outline the business objectives,
        scope, and requirements for your project.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ButtonGenerateBRD
          onClick={handleGenerateBRD}
          disabled={isLoading || status === "completed"}
          label={status === "completed" ? "BRD Generated" : "Generate BRD"}
        />
        <BRDStatusIndicator status={status} />
      </div>
    </div>
  );
};

export default BRDGenerationSection;
