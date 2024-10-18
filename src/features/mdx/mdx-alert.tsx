import {
  Alert,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "@/components/ui/alert";
import type { LucideIcon } from "lucide-react";
import { CheckCircle, CircleAlert, Info, TriangleAlert } from "lucide-react";
import type { PropsWithChildren } from "react";

export type MdxAlertProps = PropsWithChildren<{}>;

const MdxAlert = ({
  children,
  title,
  icon: Icon,
  className,
}: MdxAlertProps & {
  title: string;
  icon: LucideIcon;
  className: string;
}) => {
  return (
    <Alert className={className}>
      <AlertTitle className="flex flex-row items-center gap-2 text-xl font-semibold">
        <Icon />
        {title}
      </AlertTitle>
      <AlertDescription className="text-base text-foreground">
        {children}
      </AlertDescription>
    </Alert>
  );
};

export const MdxInfo = ({ children }: MdxAlertProps) => {
  return (
    <MdxAlert
      title="Info"
      icon={Info}
      className={alertVariants({ variant: "info" })}
    >
      {children}
    </MdxAlert>
  );
};

export const MdxWarning = ({ children }: MdxAlertProps) => {
  return (
    <MdxAlert
      title="Attention"
      icon={TriangleAlert}
      className={alertVariants({ variant: "warning" })}
    >
      {children}
    </MdxAlert>
  );
};

export const MdxDestructive = ({ children }: MdxAlertProps) => {
  return (
    <MdxAlert
      title="Erreur"
      icon={CircleAlert}
      className={alertVariants({ variant: "destructive" })}
    >
      {children}
    </MdxAlert>
  );
};

export const MdxSuccess = ({ children }: MdxAlertProps) => {
  return (
    <MdxAlert
      title="Succès"
      icon={CheckCircle}
      className={alertVariants({ variant: "success" })}
    >
      {children}
    </MdxAlert>
  );
};
