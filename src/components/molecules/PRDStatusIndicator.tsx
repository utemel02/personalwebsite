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
      "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200",
    "in-progress":
      "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200",
    completed:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200",
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
