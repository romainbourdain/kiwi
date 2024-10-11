"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Fragment, type PropsWithChildren } from "react";

const queryClient = new QueryClient();

export type ProviderProps = PropsWithChildren<{}>;

export const Provider = ({ children }: ProviderProps) => {
  return (
    <Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
};
