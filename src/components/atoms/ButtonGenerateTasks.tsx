"use client";

import React from "react";

interface ButtonGenerateTasksProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonGenerateTasks: React.FC<ButtonGenerateTasksProps> = ({
  label = "Generate Tasks",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors 
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonGenerateTasks;
