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
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-neutral-800">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border ${
          error ? "border-danger" : "border-neutral-300"
        } px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-light transition-all`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-danger text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputText;
