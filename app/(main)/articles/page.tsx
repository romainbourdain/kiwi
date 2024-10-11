import { Caption } from "@/components/typography/text";
import { Title } from "@/components/typography/title";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage({}: PageParams) {
  const articles = await db.article.findMany();

  return (
    <div className="space-y-8">
      <Title>Articles</Title>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <Card key={article.slug}>
            <CardHeader>
              <Caption>
                {new Date(article.updatedAt).toLocaleDateString()}
              </Caption>
              <Title variant="h3">{article.title}</Title>
            </CardHeader>
            <CardContent>
              <Caption className="line-clamp-2">{article.description}</Caption>
            </CardContent>
            <CardFooter>
              <Link href={`/articles/${article.slug}`} className="text-primary">
                Voir Plus
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
