import { CircledIcon } from "@/components/icon/circled-icon";
import { Text } from "@/components/typography/text";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type HomeCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  image: string;
  href: string;
};

export const HomeCard = ({
  title,
  subtitle,
  icon: Icon,
  image,
  href,
}: HomeCardProps) => {
  return (
    <Link href={href}>
      <Card className="overflow-hidden p-0 hover:shadow">
        <div className="relative">
          <Image
            src={image}
            alt={`${title} image`}
            width={1080}
            height={720}
            className="h-40 w-full object-cover"
          />
          <CircledIcon icon={Icon} className="absolute left-0 top-0 m-4" />
        </div>
        <CardContent className="flex flex-col gap-1 py-4">
          <Text variant="h3">{title}</Text>
          <Text variant="muted">{subtitle}</Text>
        </CardContent>
        <CardFooter className="mt-4 flex w-full justify-between">
          <Text variant="sm" className="font-semibold">
            Découvrir
          </Text>
          <ArrowRight className="size-4" />
        </CardFooter>
      </Card>
    </Link>
  );
};
