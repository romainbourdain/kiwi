import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";

export type TextProps = HTMLAttributes<HTMLSpanElement> &
  PropsWithChildren<{
    as?: "p" | "span" | "em" | "strong";
  }>;

export const Text = forwardRef<HTMLHeadingElement, TextProps>(
  ({ as, children, className, ...props }, ref) => {
    const TitleElement = as || "p";
    return (
      <TitleElement
        ref={ref}
        className={cn("text-foreground-1", className)}
        {...props}
      >
        {children}
      </TitleElement>
    );
  }
);

Text.displayName = "Text";

export const Caption = forwardRef<HTMLHeadingElement, TextProps>(
  ({ as, children, className, ...props }, ref) => {
    const TitleElement = as || "p";
    return (
      <TitleElement
        ref={ref}
        className={cn("text-foreground-2", className)}
        {...props}
      >
        {children}
      </TitleElement>
    );
  }
);

Caption.displayName = "Caption";
