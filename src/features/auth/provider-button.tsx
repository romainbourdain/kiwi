"use client";

import { Button } from "@/components/ui/button";
import { getServerUrl } from "@/lib/server-url";
import { useMutation } from "@tanstack/react-query";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

const SIGN_IN_ERROR_URL = "";

export type ProviderButtonProps = {
  provider: { id: string; name: string };
};

export const ProviderButton = ({ provider }: ProviderButtonProps) => {
  const searchParams = useSearchParams();
  const signInMutation = useMutation({
    mutationFn: async () => {
      try {
        await signIn(provider.id, {
          callbackUrl: searchParams.get("callbackUrl") ?? `${getServerUrl()}/`,
        });
      } catch (e) {
        if (e instanceof AuthError)
          return redirect(`${SIGN_IN_ERROR_URL}?error=${e.type}`);
        throw e;
      }
    },
  });

  return (
    <Button
      className="w-full"
      onClick={() => {
        signInMutation.mutate();
      }}
      loading={signInMutation.isPending}
      disabled={signInMutation.isPending}
    >
      <span>Continuer avec {provider.name}</span>
    </Button>
  );
};
