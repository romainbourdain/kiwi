import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { notoSans, vazirmatn } from "./fonts";
import { Provider } from "./provider";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Kiwi",
  description: "Prends ton envol !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          notoSans.variable,
          vazirmatn.variable,
          "h-screen overflow-hidden antialiased"
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
