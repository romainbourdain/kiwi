import { Row } from "@/components/container/row";
import { Title } from "@/components/typography/title";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "../auth/user-button";
import { ThemeToggle } from "../theme/theme-toggle";

export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b p-3">
      <Row className="gap-4">
        <Link href="/">
          <Row className="gap-2">
            <Image
              src="/logo.svg"
              alt="kiwi logo"
              width={100}
              height={100}
              className="size-8"
            />
            <Title variant="h4" className="font-bold">
              Kiwi
            </Title>
          </Row>
        </Link>
        <Link
          href="/articles"
          className={buttonVariants({ variant: "link", size: "sm" })}
        >
          Articles
        </Link>
      </Row>
      <Row className="gap-2">
        <ThemeToggle />
        <UserButton />
      </Row>
    </nav>
  );
};
