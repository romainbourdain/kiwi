import { Row } from "@/components/container/row";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "../../auth/user-button";
import { ThemeToggle } from "../../theme/theme-toggle";
import { NavbarLink } from "./navbar-link";

export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-card p-3">
      <Row>
        <Link href="/" className="mr-4">
          <Row className="gap-2">
            <Image
              src="/logo.svg"
              alt="kiwi logo"
              width={100}
              height={100}
              className="size-8"
            />
            <h4 className="font-bold">Kiwi</h4>
          </Row>
        </Link>
        <NavbarLink href="/home" label="Accueil" />
        <NavbarLink href="/courses" label="Cours" />
        <NavbarLink href="/articles" label="Articles" />
      </Row>
      <Row className="gap-2">
        <ThemeToggle />
        <UserButton />
      </Row>
    </nav>
  );
};
