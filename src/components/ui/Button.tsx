"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  rounded?: "default" | "full" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", rounded = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "overflow-hidden group",

          // Variants
          {
            "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]":
              variant === "primary",
            "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/40 hover:scale-[1.02] active:scale-[0.98]":
              variant === "secondary",
            "border-2 border-primary/50 text-primary bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors":
              variant === "outline",
            "text-primary hover:bg-primary/10 active:bg-primary/20":
              variant === "ghost",
            "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-xl hover:shadow-destructive/40 hover:scale-[1.02] active:scale-[0.98]":
              variant === "destructive",
          },

          // Sizes
          {
            "h-9 px-4 text-sm font-extralight": size === "sm",
            "h-11 px-6 text-base font-extralight": size === "md",
            "h-14 px-8 text-lg font-normal": size === "lg",
          },

          // Rounded
          {
            "rounded-lg": rounded === "default",
            "rounded-full": rounded === "full",
            "rounded-2xl": rounded === "lg",
          },

          className
        )}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
