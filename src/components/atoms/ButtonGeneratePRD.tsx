"use client";

import React from "react";

interface ButtonGeneratePRDProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonGeneratePRD: React.FC<ButtonGeneratePRDProps> = ({
  label = "Generate PRD",
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
            : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonGeneratePRD;
