import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium ring-offset-background-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
        neutral: "bg-neutral text-neutral-foreground hover:bg-neutral/80",
        success: "bg-success text-success-foreground hover:bg-success/80",
        info: "bg-info text-info-foreground hover:bg-info/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        error: "bg-error text-error-foreground hover:bg-error/80",
        outline: "border bg-transparent hover:bg-border/80",

        ghost: "bg-transparent hover:bg-border/80",
        link: "text-foreground-2 hover:text-foreground-1",
      },
      size: {
        text: "px-0",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
      shape: {
        default: "",
        square: "aspect-square p-1",
        circle: "aspect-square rounded-full p-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
