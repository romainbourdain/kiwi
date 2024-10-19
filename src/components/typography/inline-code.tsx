import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";

export type InlineCodeProps = PropsWithChildren<
  HTMLAttributes<HTMLElement> & { className?: string }
>;

export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);

InlineCode.displayName = "InlineCode";
