import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import { Loader2 } from "lucide-react";

export type SpinnerProps = LucideProps;

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return <Loader2 className={cn("animate-spin", className)} {...props} />;
};
