import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",

          // Variants
          {
            "bg-[var(--color-primary)] text-white hover:opacity-90":
              variant === "primary",
            "bg-[var(--color-secondary)] text-white hover:opacity-90":
              variant === "secondary",
            "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white":
              variant === "outline",
            "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10":
              variant === "ghost",
          },

          // Sizes
          {
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },

          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
