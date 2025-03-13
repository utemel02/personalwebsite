"use client";

import React from "react";

interface TextareaDescriptionProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  name?: string;
  error?: string;
  rows?: number;
}

export const TextareaDescription: React.FC<TextareaDescriptionProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  name,
  error,
  rows = 4,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-neutral-800">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`border ${
          error ? "border-danger" : "border-neutral-300"
        } px-3 py-2 rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-surface-light`}
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

export default TextareaDescription;
