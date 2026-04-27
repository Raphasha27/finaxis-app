import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  className,
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_rgba(108,92,231,0.3)]",
    secondary: "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(0,209,255,0.3)]",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={cn(
        "rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
