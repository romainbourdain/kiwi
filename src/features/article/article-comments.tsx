import { getArticleBySlug } from "@/actions/articles.action";
import { Row } from "@/components/container/flex";
import { Text } from "@/components/typography/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getDate, getUserFallback } from "@/utils/format";
import { ArrowBigUp, Reply, SmilePlus } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export type ArticleCommentsProps = {
  slug: string;
};

export const ArticleComments = ({ slug }: ArticleCommentsProps) => {
  return (
    <div className="max-w-screen-md space-y-4">
      <Text variant="h2">Commentaires</Text>
      <Row className="gap-2">
        <Input placeholder="Commenter" />
        <Button>Envoyer</Button>
      </Row>
      <div className="space-y-4">
        <Suspense fallback={<ArticleCommentsSkeleton />}>
          <ArticleCommentsContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
};

const ArticleCommentsContent = async ({ slug }: ArticleCommentsProps) => {
  const res = await getArticleBySlug({ slug });

  if (!res?.data) return notFound();

  const { data: article } = res;

  return (
    <>
      {article.comments.length === 0 ? (
        <Text variant="h4">Aucun commentaire</Text>
      ) : (
        article.comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <Row className="justify-between gap-3">
                <Avatar>
                  {comment.author.image && (
                    <AvatarImage src={comment.author.image} />
                  )}
                  <AvatarFallback>
                    {getUserFallback(comment.author)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-1">
                  <Text variant="lg" className="font-bold">
                    {comment.author.name}
                  </Text>
                  <Text variant="muted">{getDate(comment.createdAt)}</Text>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowBigUp className="size-4" /> 0
                </Button>
              </Row>
            </CardHeader>
            <CardContent>
              <Text variant="p">{comment.content}</Text>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm">
                <Reply className="size-4" />
                Répondre
              </Button>
              <Button variant="link" size="sm">
                <SmilePlus className="size-4" />
                Réagir
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </>
  );
};

const ArticleCommentsSkeleton = () => {
  return (
    <>
      {new Array(3).fill(0).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Row className="justify-between gap-3">
              <Skeleton className="size-[40px] rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-[20px] w-2/3 rounded-full" />
                <Skeleton className="h-[14px] w-[120px] rounded-full" />
              </div>
              <Skeleton className="h-[32px] w-[56px] rounded-md" />
            </Row>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-[18px] w-full rounded-full" />
            <Skeleton className="h-[18px] w-full rounded-full" />
            <Skeleton className="h-[18px] w-1/3 rounded-full" />
          </CardContent>
          <CardFooter className="gap-2">
            <Skeleton className="h-[32px] w-[100px] rounded-md" />
            <Skeleton className="h-[32px] w-[85px] rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
