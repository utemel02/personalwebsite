"use client";

import React, { useState } from "react";
import { ButtonGeneratePRD } from "../atoms/ButtonGeneratePRD";
import { PRDStatusIndicator, PRDStatus } from "../molecules/PRDStatusIndicator";

interface PRDGenerationSectionProps {
  initialStatus?: PRDStatus;
  isBRDGenerated?: boolean;
  onGeneratePRD?: () => Promise<void>;
}

export const PRDGenerationSection: React.FC<PRDGenerationSectionProps> = ({
  initialStatus = "pending",
  isBRDGenerated = false,
  onGeneratePRD,
}) => {
  const [status, setStatus] = useState<PRDStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePRD = async () => {
    if (isLoading || status === "completed" || !isBRDGenerated) return;

    setIsLoading(true);
    setStatus("in-progress");

    try {
      if (onGeneratePRD) {
        await onGeneratePRD();
      } else {
        // Mock delay for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus("completed");
    } catch (error) {
      setStatus("pending");
      console.error("Error generating PRD:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 border border-amber-200 rounded-lg bg-amber-50 dark:bg-stone-800 dark:border-stone-700 shadow-sm">
      <h3 className="text-lg font-medium text-stone-800 dark:text-amber-50 mb-3">
        Product Requirements Document (PRD)
      </h3>

      <p className="text-sm text-stone-600 dark:text-amber-200 mb-4">
        Generate a Product Requirements Document (PRD) based on your BRD. This
        document will detail the product features, functionality, and technical
        specifications.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ButtonGeneratePRD
          onClick={handleGeneratePRD}
          disabled={!isBRDGenerated || isLoading || status === "completed"}
          label={
            !isBRDGenerated
              ? "Generate BRD First"
              : status === "completed"
              ? "PRD Generated"
              : "Generate PRD"
          }
        />
        <PRDStatusIndicator status={status} />
      </div>
    </div>
  );
};

export default PRDGenerationSection;
