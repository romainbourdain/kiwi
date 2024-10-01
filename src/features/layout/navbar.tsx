import { Row } from "@/components/container/row";
import { Link } from "@/components/typography/link";
import { Title } from "@/components/typography/title";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="flex w-full justify-between border-b p-3">
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
    </nav>
  );
};
