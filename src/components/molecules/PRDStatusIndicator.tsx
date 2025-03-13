"use client";

import React from "react";

export type PRDStatus = "pending" | "in-progress" | "completed";

interface PRDStatusIndicatorProps {
  status: PRDStatus;
}

export const PRDStatusIndicator: React.FC<PRDStatusIndicatorProps> = ({
  status,
}) => {
  // Define styles for different status types
  const statusStyles = {
    pending:
      "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200",
    "in-progress":
      "bg-amber-100 text-amber-800 border-amber-500 dark:bg-amber-800/40 dark:text-amber-100",
    completed:
      "bg-emerald-50 text-emerald-700 border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200",
  };

  // Define status labels
  const statusLabels = {
    pending: "Pending",
    "in-progress": "In-Progress",
    completed: "Completed",
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </span>
    </div>
  );
};

export default PRDStatusIndicator;
