import { cn } from "@/lib/utils";
import type { LiHTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";

export type ListProps = PropsWithChildren<
  LiHTMLAttributes<HTMLUListElement> & { className?: string }
>;

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

export type ListItemProps = PropsWithChildren<
  LiHTMLAttributes<HTMLLIElement> & { className?: string }
>;

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(className)} {...props}>
        {children}
      </li>
    );
  }
);

List.displayName = "List";
ListItem.displayName = "ListItem";
