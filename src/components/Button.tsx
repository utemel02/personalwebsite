import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "rounded-md font-medium transition-colors focus:outline-none";

  const disabledStyles =
    "bg-neutral-300 text-neutral-500 cursor-not-allowed dark:bg-neutral-700 dark:text-neutral-400";

  const variantStyles = {
    primary:
      "bg-primary hover:bg-primary-dark text-primary-foreground active:bg-primary-dark focus:ring-2 focus:ring-primary-light focus:ring-opacity-50",
    secondary:
      "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${
        disabled ? disabledStyles : variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
