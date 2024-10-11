"use client";

import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type PropsWithChildren } from "react";

export const titleVariants = cva("font-bold text-foreground-1", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 pb-4 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    },
    /*     color: {
      gradient:
        "bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent",
      foreground: "text-foreground-1",
    }, */
  },
  defaultVariants: {
    variant: "h1",
    // color: "foreground",
  },
});

export type TitleProps = HTMLAttributes<HTMLHeadingElement> &
  PropsWithChildren<{
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
  }> &
  VariantProps<typeof titleVariants>;

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ as, children, variant, className, ...props }, ref) => {
    const TitleElement = as || variant || "h1";
    return (
      <TitleElement
        ref={ref}
        className={cn("font-vazirmatn", titleVariants({ variant }), className)}
        {...props}
      >
        {children}
      </TitleElement>
    );
  }
);

Title.displayName = "Title";
