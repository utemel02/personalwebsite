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
            ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            : "bg-success text-white hover:bg-success-dark active:bg-success-dark focus:ring-2 focus:ring-success-light focus:ring-opacity-50 focus:outline-none"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonGenerateBRD;
