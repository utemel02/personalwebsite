"use client";

import React from "react";
import { Square, CheckSquare, MinusSquare } from "lucide-react";
import { TaskStatus } from "./TaskCard";

export interface CheckboxStatusProps {
  status: TaskStatus;
  onToggle?: (newStatus: TaskStatus) => void;
  className?: string;
  size?: number;
}

export const CheckboxStatus: React.FC<CheckboxStatusProps> = ({
  status,
  onToggle,
  className = "",
  size = 20,
}) => {
  // Function to determine the next status in the cycle
  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    switch (currentStatus) {
      case "todo":
        return "in-progress";
      case "in-progress":
        return "done";
      case "done":
        return "todo";
      default:
        return "todo";
    }
  };

  // Handle the click event to toggle status
  const handleClick = () => {
    if (onToggle) {
      const nextStatus = getNextStatus(status);
      onToggle(nextStatus);
    }
  };

  // Return the appropriate icon based on the status
  return (
    <button
      onClick={handleClick}
      className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${className}`}
      aria-label={`Mark as ${getNextStatus(status)}`}
    >
      {status === "todo" && <Square size={size} />}
      {status === "in-progress" && <MinusSquare size={size} />}
      {status === "done" && <CheckSquare size={size} />}
    </button>
  );
};

export default CheckboxStatus;
