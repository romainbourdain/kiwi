"use client";

import { Center } from "@/components/container/flex";
import { Spinner } from "@/components/icon/spinner";
import { Text } from "@/components/typography/text";
import { useSession } from "next-auth/react";
import type { PropsWithChildren } from "react";

export type ProtectedClientProps = PropsWithChildren<{}>;

export const Protected = ({ children }: ProtectedClientProps) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <Center>
        <Spinner className="size-12" />
      </Center>
    );
  }

  if (!session?.status || session.status === "unauthenticated")
    return <Text variant="p">Accès refusé</Text>;

  return children;
};
