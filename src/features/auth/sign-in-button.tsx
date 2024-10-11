"use client";

import { Button } from "@/components/ui/button";
import { useHref } from "@/hooks/use-href";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function SignInButton() {
  const currentHref = useHref();
  const href = currentHref
    ? `/auth/sign-in?callbackUrl=${currentHref}`
    : "/auth/sign-in";

  return (
    <Link href={href}>
      <Button size="sm">
        <LogIn className="size-4" />
        Se connecter
      </Button>
    </Link>
  );
}
