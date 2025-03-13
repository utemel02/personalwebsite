"use client";

import React from "react";

export type TasksStatus = "pending" | "in-progress" | "completed";

interface TasksStatusIndicatorProps {
  status: TasksStatus;
}

export const TasksStatusIndicator: React.FC<TasksStatusIndicatorProps> = ({
  status,
}) => {
  // Define styles for different status types
  const statusStyles = {
    pending:
      "bg-warning-light/20 text-warning-dark border-warning dark:bg-warning-dark/30 dark:text-warning-light",
    "in-progress":
      "bg-info-light/20 text-info-dark border-info dark:bg-info-dark/30 dark:text-info-light",
    completed:
      "bg-success-light/20 text-success-dark border-success dark:bg-success-dark/30 dark:text-success-light",
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

export default TasksStatusIndicator;
