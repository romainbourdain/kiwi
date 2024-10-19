import { Row } from "@/components/container/flex";
import { Text } from "@/components/typography/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article, Tag, User } from "@prisma/client";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ArticleCardProps = {
  author: User;
  article: Article;
  tags: Tag[];
  views: number;
  likes: number;
};

export const ArticleCard = ({
  author,
  article,
  views,
  likes,
  tags,
}: ArticleCardProps) => {
  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="flex h-full flex-col gap-4 p-5 hover:shadow">
        <Image
          src={article.image || ""}
          alt={`${article.title} cover`}
          width={1080}
          height={720}
          className="h-40 w-full rounded-md"
        />
        <Row className="items-start gap-3">
          <Row className="flex-1 flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag.slug}>{tag.slug}</Badge>
            ))}
          </Row>
          <div className="flex items-center gap-1">
            <Eye className="size-4" />
            <Text variant="sm">{views}</Text>
          </div>
          <div className="flex items-center gap-1">
            <Star className="size-4" />
            <Text variant="sm">{likes}</Text>
          </div>
        </Row>
        <Text variant="sm" color="secondary">
          {new Date(article.createdAt).toLocaleDateString("fr-FR")}
        </Text>
        <Text variant="h3" className="flex-1">
          {article.title}
        </Text>
        <Row className="gap-2">
          <Avatar className="size-8">
            <AvatarImage src={author.image || ""} />
            <AvatarFallback>{author.name?.[0]}</AvatarFallback>
          </Avatar>
          <Text variant="base" className="font-semibold">
            {author.name}
          </Text>
        </Row>
      </Card>
    </Link>
  );
};

export const LoadingArticleCard = () => {
  return (
    <Card className="size-full min-h-[400px] space-y-4 p-5">
      <Skeleton className="h-40 w-full rounded-md" />
      <Row className="gap-2">
        <Row className="flex-1 gap-2">
          <Skeleton className="h-4 w-1/2 rounded-sm" />
          <Skeleton className="h-4 w-1/4 rounded-sm" />
        </Row>
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="size-4 rounded-full" />
      </Row>
      <Skeleton className="h-4 w-1/3 rounded-full" />
      <Skeleton className="h-6 w-full rounded-full" />
      <Skeleton className="h-6 w-2/3 rounded-full" />
      <Row className="gap-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-1/4" />
      </Row>
    </Card>
  );
};
