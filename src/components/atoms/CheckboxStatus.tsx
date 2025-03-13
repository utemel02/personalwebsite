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

  // Status-specific colors
  const statusColors = {
    todo: "text-info hover:text-info-dark",
    "in-progress": "text-warning hover:text-warning-dark",
    done: "text-success hover:text-success-dark",
  };

  // Handle the click event to toggle status
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent event from bubbling up
    if (onToggle) {
      const nextStatus = getNextStatus(status);
      onToggle(nextStatus);
    }
  };

  // Return the appropriate icon based on the status
  return (
    <button
      onClick={handleClick}
      className={`${statusColors[status]} transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded p-0.5 ${className}`}
      aria-label={`Mark as ${getNextStatus(status)}`}
      title={`Current status: ${status}. Click to mark as ${getNextStatus(
        status,
      )}`}
    >
      {status === "todo" && <Square size={size} strokeWidth={1.5} />}
      {status === "in-progress" && (
        <MinusSquare size={size} strokeWidth={1.5} />
      )}
      {status === "done" && <CheckSquare size={size} strokeWidth={1.5} />}
    </button>
  );
};

export default CheckboxStatus;
