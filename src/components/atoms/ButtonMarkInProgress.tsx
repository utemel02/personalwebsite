"use client";

import React from "react";

interface ButtonMarkInProgressProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonMarkInProgress: React.FC<ButtonMarkInProgressProps> = ({
  label = "Start Task",
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
            : "bg-warning text-white hover:bg-warning-dark active:bg-warning-dark focus:ring-2 focus:ring-warning-light focus:ring-opacity-50 focus:outline-none"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonMarkInProgress;
