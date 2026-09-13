import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "compassionate" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
}

export const buttonVariants = ({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: "primary" | "secondary" | "compassionate" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
} = {}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[8px] min-h-[44px] min-w-[44px]";

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
    sm: "text-xs px-3.5 py-2.5 min-h-[44px]",
    md: "text-sm px-5 py-2.5 min-h-[44px]",
    lg: "text-base px-6 py-3.5 min-h-[44px]",
  };

  return cn(baseStyles, variants[variant], sizes[size], className);
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { className, variant = "primary", size = "md", href, target, rel, ...props },
    ref
  ) => {
    const classes = buttonVariants({ variant, size, className });

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
