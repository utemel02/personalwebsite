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
    todo: "border-l-4 border-l-amber-300",
    "in-progress": "border-l-4 border-l-amber-500",
    done: "border-l-4 border-l-emerald-500",
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
      className={`bg-white dark:bg-stone-800 rounded-md shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer ${statusClasses[status]} border border-amber-100 dark:border-stone-700`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${title}, Status: ${status}`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-stone-800 dark:text-amber-50 line-clamp-2">
          {title}
        </h3>
        <CheckboxStatus
          status={status}
          onToggle={handleStatusToggle}
          className="flex-shrink-0 ml-2 mt-0.5"
        />
      </div>

      {description && (
        <p className="text-sm text-stone-600 dark:text-amber-200 mb-3 line-clamp-3">
          {description}
        </p>
      )}

      <div className="mt-2 flex justify-between items-center">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            status === "todo"
              ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200"
              : status === "in-progress"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-100"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
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
