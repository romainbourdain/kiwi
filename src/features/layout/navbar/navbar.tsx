import { Row } from "@/components/container/flex";
import { Text } from "@/components/typography/text";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "../../auth/user-button";
import { ThemeToggle } from "../../theme/theme-toggle";
import { NavbarLink } from "./navbar-link";

export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-card px-5 py-3">
      <Row>
        <Link href="/" className="mr-4 flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="kiwi logo"
            width={100}
            height={100}
            className="size-7"
          />
          <Text variant="lg" className="font-bold">
            Kiwi
          </Text>
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
