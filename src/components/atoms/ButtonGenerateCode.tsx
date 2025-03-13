"use client";

import React from "react";

interface ButtonGenerateCodeProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonGenerateCode: React.FC<ButtonGenerateCodeProps> = ({
  label = "Run Code Generation",
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
            : "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark focus:ring-2 focus:ring-accent-light focus:ring-opacity-50 focus:outline-none"
        }`}
    >
      {label}
    </button>
  );
};

export default ButtonGenerateCode;
