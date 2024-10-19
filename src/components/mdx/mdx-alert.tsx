import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { AlertTriangle, Info, Lightbulb, OctagonAlert } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";
import { Row } from "../container/flex";
import { Text } from "../typography/text";

export const mdxAlertVariants = cva(
  "my-6 w-full items-center rounded-md border border-l-4 bg-card p-4",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive/60 [&>*:first-child]:text-destructive",
        warning: "border-warning/60 [&>*:first-child]:text-warning",
        info: "border-info/60 [&>*:first-child]:text-info",
        success: "border-success/60 [&>*:first-child]:text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const getAlertIcon = (
  variant: VariantProps<typeof mdxAlertVariants>["variant"]
) => {
  switch (variant) {
    case "destructive":
      return OctagonAlert;
    case "warning":
      return AlertTriangle;
    case "info":
      return Info;
    case "success":
      return Lightbulb;
    default:
      return;
  }
};

const getAlertTitle = (
  variant: VariantProps<typeof mdxAlertVariants>["variant"]
) => {
  switch (variant) {
    case "destructive":
      return "Danger";
    case "warning":
      return "Attention";
    case "info":
      return "Information";
    case "success":
      return "Conseil";
    default:
      return "";
  }
};

export type MdxAlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof mdxAlertVariants> & {
    title?: string;
  };

export const MdxAlert = forwardRef<HTMLDivElement, MdxAlertProps>(
  ({ variant, className, title, children, ...props }) => {
    const Icon = getAlertIcon(variant);
    return (
      <div
        className={cn("space-y-2", mdxAlertVariants({ variant }), className)}
        {...props}
      >
        {Icon && (
          <Row className="gap-2">
            <Icon className="size-5" />
            <Text variant="base" className="font-semibold">
              {title || getAlertTitle(variant)}
            </Text>
          </Row>
        )}
        <Text variant="p">{children}</Text>
      </div>
    );
  }
);

MdxAlert.displayName = "MdxAlert";
