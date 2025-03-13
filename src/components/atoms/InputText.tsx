"use client";

import React from "react";

interface InputTextProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  error?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  name,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputText;
