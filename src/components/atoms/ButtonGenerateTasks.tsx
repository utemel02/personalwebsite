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
            ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark focus:ring-2 focus:ring-primary-light focus:ring-opacity-50 focus:outline-none"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonGenerateTasks;
