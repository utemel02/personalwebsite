"use client";

import React from "react";
import CheckboxStatus from "./CheckboxStatus";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface TaskCardProps {
  title: string;
  description?: string;
  status: TaskStatus;
  onClick?: () => void;
  onStatusChange?: (newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  onClick,
  onStatusChange,
}) => {
  // Status-specific styling
  const statusClasses = {
    todo: "border-l-4 border-l-gray-400",
    "in-progress": "border-l-4 border-l-yellow-400",
    done: "border-l-4 border-l-green-500",
  };

  // Handle status toggle separately from card click
  const handleStatusToggle = (newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  // Handle card click but prevent propagation from checkbox click
  const handleCardClick = (e: React.MouseEvent) => {
    if (e.defaultPrevented) return;
    onClick?.();
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-md shadow-sm p-4 mb-2 hover:shadow-md transition-shadow cursor-pointer ${statusClasses[status]}`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <CheckboxStatus
          status={status}
          onToggle={handleStatusToggle}
          className="flex-shrink-0 ml-2"
        />
      </div>

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}

      <div className="mt-2 flex justify-between items-center">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === "todo"
              ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              : status === "in-progress"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
          }`}
        >
          {status === "todo"
            ? "To Do"
            : status === "in-progress"
            ? "In Progress"
            : "Done"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
