"use client";

import { Text } from "@/components/typography/text";
import { useSession } from "next-auth/react";
import type { PropsWithChildren } from "react";

export type ProtectedClientProps = PropsWithChildren<{}>;

export const Protected = ({ children }: ProtectedClientProps) => {
  const session = useSession();

  if (session.status === "loading") {
    return <Text variant="p">Chargement...</Text>;
  }

  if (!session?.status || session.status === "unauthenticated")
    return <Text variant="p">Accès refusé</Text>;

  return children;
};
