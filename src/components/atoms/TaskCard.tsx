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
    todo: "border-l-4 border-l-info",
    "in-progress": "border-l-4 border-l-warning",
    done: "border-l-4 border-l-success",
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

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onClick?.();
    }
  };

  return (
    <div
      className={`bg-surface-light dark:bg-neutral-800 rounded-md shadow p-4 hover:shadow-md transition-all cursor-pointer ${statusClasses[status]}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${title}, Status: ${status}`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2">
          {title}
        </h3>
        <CheckboxStatus
          status={status}
          onToggle={handleStatusToggle}
          className="flex-shrink-0 ml-2 mt-0.5"
        />
      </div>

      {description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3">
          {description}
        </p>
      )}

      <div className="mt-2 flex justify-between items-center">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            status === "todo"
              ? "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
              : status === "in-progress"
              ? "bg-warning-light/20 text-warning-dark dark:bg-warning-dark/30 dark:text-warning-light"
              : "bg-success-light/20 text-success-dark dark:bg-success-dark/30 dark:text-success-light"
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
