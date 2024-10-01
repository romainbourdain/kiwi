"use client";

import { Toaster } from "@/components/ui/sonner";
import { Fragment, type PropsWithChildren } from "react";

export type ProviderProps = PropsWithChildren<{}>;

export const Provider = ({ children }: ProviderProps) => {
  return (
    <Fragment>
      <Toaster />
      {children}
    </Fragment>
  );
};
