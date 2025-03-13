"use client";

import React from "react";

interface ButtonGenerateBRDProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonGenerateBRD: React.FC<ButtonGenerateBRDProps> = ({
  label = "Generate BRD",
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
            : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonGenerateBRD;
