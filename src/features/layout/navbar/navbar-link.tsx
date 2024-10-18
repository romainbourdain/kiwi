"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavbarLinkProps = {
  href: string;
  label: string;
};

export const NavbarLink = ({ href, label }: NavbarLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link", size: "sm" }),
        pathname === href && "font-bold text-foreground"
      )}
    >
      {label}
    </Link>
  );
};
