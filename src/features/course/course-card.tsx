import { Typography } from "@/components/typography/text";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export type CourseCardProps = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export const CourseCard = ({
  title,
  subtitle,
  image,
  href,
}: CourseCardProps) => {
  return (
    <Link href={href}>
      <Card className="flex flex-row items-center gap-4 p-4 hover:shadow">
        <Image
          src={image}
          alt={`${title} image`}
          width={400}
          height={400}
          className="size-16 rounded-md"
        />
        <div className="flex w-full flex-col gap-2">
          <Typography variant="h4">{title}</Typography>
          <Typography variant="sm" color="secondary">
            {subtitle}
          </Typography>
        </div>
      </Card>
    </Link>
  );
};
