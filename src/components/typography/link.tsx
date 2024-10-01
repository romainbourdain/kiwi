import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { buttonVariants } from "../ui/button";

export type LinkProps = NextLinkProps &
  HTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, variant, shape, size, ...props }, ref) => {
    return (
      <NextLink
        href={href}
        className={cn(
          variant
            ? buttonVariants({ variant, shape, size })
            : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 ring-offset-background-1 rounded-md transition",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";
