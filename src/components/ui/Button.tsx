import type { ButtonHTMLAttributes } from "react";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:text-gray-400",
  danger: "bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className = "",
  ...rest
}: Readonly<ButtonProps>) {
  return (
    <button
      disabled={disabled ?? loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 
        text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed 
        ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {loading && (
        <ImSpinner2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
