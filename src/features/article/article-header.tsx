import { getArticleInfos } from "@/actions/articles.action";
import { Row } from "@/components/container/flex";
import { Text } from "@/components/typography/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getDate } from "@/utils/format";
import { Eye, Forward, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LikeButton } from "./like-button";

export type ArticleHeaderProps = {
  slug: string;
};

export const ArticleHeader = ({ slug }: ArticleHeaderProps) => {
  return (
    <Suspense fallback={<ArticleHeaderSkeleton />}>
      <ArticleHeaderContent slug={slug} />
    </Suspense>
  );
};

const ArticleHeaderContent = async ({ slug }: ArticleHeaderProps) => {
  const res = await getArticleInfos({ slug });

  if (!res?.data) return notFound();

  const { data: article } = res;

  return (
    <>
      <Text variant="muted">{getDate(article.updatedAt)}</Text>
      <Row className="gap-2">
        {article.tags?.map((tag) => (
          <Badge key={tag.slug}>{tag.slug}</Badge>
        ))}
      </Row>
      <div className="space-y-3">
        <Text variant="h1">{article.title}</Text>
        <Text variant="p">{article.description}</Text>
      </div>
      <Row className="gap-2">
        <LikeButton
          isLiked={article.isLiked}
          likes={article._count.likes}
          slug={article.slug}
        />

        <Button variant="outline">
          <Forward className="size-4" />
          Partager
        </Button>
      </Row>
      <Row className="gap-3">
        <Row className="gap-1">
          <Eye className="size-4" />
          {article._count.views}
        </Row>
        <Row className="gap-1">
          <MessageCircle className="size-4" />
          {article._count.comments}
        </Row>
      </Row>
    </>
  );
};

const ArticleHeaderSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[19px] w-[100px] rounded-full" />
      <Row className="gap-2">
        <Skeleton className="h-[22px] w-[80px] rounded-md" />
        <Skeleton className="h-[22px] w-[60px] rounded-md" />
      </Row>
      <Skeleton className="h-[40px] w-full rounded-full" />
      <Skeleton className="h-[28px] w-full rounded-full" />
      <Row className="gap-2">
        <Skeleton className="h-[36px] w-[72px] rounded-md" />
        <Skeleton className="h-[36px] w-[116px] rounded-md" />
      </Row>
      <Row className="gap-2">
        <Skeleton className="size-[24px] rounded-full" />
        <Skeleton className="size-[24px] rounded-full" />
      </Row>
    </>
  );
};
