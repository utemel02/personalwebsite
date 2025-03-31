"use client";

import React from "react";
import CheckboxStatus from "./CheckboxStatus";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface TaskCardProps {
  title: string;
  description?: string;
  status: TaskStatus;
  onClick?: () => void;
  onStatusChange?: (newStatus: TaskStatus) => void;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  onClick,
  onStatusChange,
  dueDate,
  priority = "medium",
}) => {
  // Status-specific styling
  const statusClasses = {
    todo: "border-l-4 border-l-amber-300 dark:border-l-amber-400",
    "in-progress": "border-l-4 border-l-amber-500 dark:border-l-amber-600",
    done: "border-l-4 border-l-emerald-500 dark:border-l-emerald-400",
  };

  const priorityClasses = {
    low: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200",
    medium:
      "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
    high: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
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
    <motion.div
      className={`bg-white dark:bg-stone-800/90 rounded-lg shadow-sm p-5 hover:shadow-xl transition-all duration-300 cursor-pointer ${statusClasses[status]} border border-amber-100 dark:border-stone-700`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${title}, Status: ${status}`}
      onKeyDown={handleKeyDown}
      whileHover={{
        scale: 1.02,
        y: -4,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-stone-800 dark:text-amber-50 line-clamp-2 text-lg">
          {title}
        </h3>
        <CheckboxStatus
          status={status}
          onToggle={handleStatusToggle}
          className="flex-shrink-0 ml-2 mt-0.5 transform scale-110"
        />
      </div>

      {description && (
        <p className="text-sm text-stone-600 dark:text-amber-200/80 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>
      )}

      <div className="mt-3 flex justify-between items-center">
        <span
          className={`text-xs px-3 py-1.5 rounded-full font-medium ${
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

        <div className="flex space-x-2">
          {dueDate && (
            <span className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2 py-1 rounded-md flex items-center">
              <Calendar size={12} className="mr-1" />
              {dueDate.toLocaleDateString()}
            </span>
          )}
          <span
            className={`text-xs px-2 py-1 rounded-md flex items-center ${priorityClasses[priority]}`}
          >
            <Clock size={12} className="mr-1" />
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
