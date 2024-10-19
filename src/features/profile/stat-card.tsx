import { CircledIcon } from "@/components/icon/circled-icon";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

export type StatCardProps = PropsWithChildren<{
  icon: LucideIcon;
  className?: string;
}>;

export const StatCard = ({ icon, children, className }: StatCardProps) => {
  return (
    <Card className={cn("flex flex-row items-center gap-6 p-4", className)}>
      <CircledIcon icon={icon} />
      <div className="flex w-full flex-col">{children}</div>
    </Card>
  );
};
