"use client";

import React from "react";

interface EnvVariableRowProps {
  variableName: string;
  value: string;
  onValueChange: (value: string) => void;
  isSecret?: boolean;
}

export const EnvVariableRow: React.FC<EnvVariableRowProps> = ({
  variableName,
  value,
  onValueChange,
  isSecret = false,
}) => {
  return (
    <div className="flex flex-row items-center space-x-4 py-2">
      <div className="font-medium text-gray-700 min-w-32">{variableName}</div>
      <input
        type={isSecret ? "password" : "text"}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder={`Enter value for ${variableName}`}
      />
    </div>
  );
};

export default EnvVariableRow;
