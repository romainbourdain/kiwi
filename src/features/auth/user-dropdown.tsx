"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { PropsWithChildren } from "react";

export type UserDropdownProps = PropsWithChildren<{}>;

export const UserDropdown = ({ children }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex items-center gap-1"
          onClick={() => {
            signOut();
          }}
        >
          <LogOut className="size-4" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
