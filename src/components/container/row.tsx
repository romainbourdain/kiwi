import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type RowProps = HTMLAttributes<HTMLDivElement> & {
  gap?: string | number;
};

export const Row = ({ className, gap, style, ...props }: RowProps) => {
  return (
    <div
      className={cn("flex items-center", className)}
      style={{ gap, ...style }}
      {...props}
    ></div>
  );
};
