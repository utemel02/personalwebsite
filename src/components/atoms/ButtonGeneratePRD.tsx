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
            ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            : "bg-info text-white hover:bg-info-dark active:bg-info-dark focus:ring-2 focus:ring-info-light focus:ring-opacity-50 focus:outline-none"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonGeneratePRD;
