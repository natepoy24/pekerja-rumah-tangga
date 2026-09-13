import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "compassionate" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[8px]";

    const variants = {
      primary:
        "bg-brand-pine text-white hover:bg-primary-container/90 active:scale-[0.98] shadow-ambient focus:ring-primary-container",
      secondary:
        "bg-transparent border border-brand-pine text-brand-pine hover:bg-surface-container-low active:scale-[0.98] focus:ring-brand-pine",
      compassionate:
        "bg-brand-ruby text-white hover:bg-secondary/90 shadow-ruby active:scale-[0.98] focus:ring-brand-ruby",
      ghost:
        "bg-transparent text-on-surface hover:bg-surface-container active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-2",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-6 py-3.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
