import { cn } from "@/lib/utils";
import type { LucideIcon, LucideProps } from "lucide-react";

export type CircledIconProps = LucideProps & {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
};

export const CircledIcon = ({
  icon: Icon,
  className,
  iconClassName,
  ...props
}: CircledIconProps) => {
  return (
    <div className={cn("rounded-full border p-2 bg-card", className)}>
      <Icon className={cn("size-10", iconClassName)} {...props} />
    </div>
  );
};
