import { Page } from "@/components/container/page";
import { Typography } from "@/components/typography/text";
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
    <Page className="max-w-screen-lg">
      <Typography variant="h1">Articles</Typography>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <Card key={article.slug}>
            <CardHeader>
              <span className="text-muted-foreground">
                {new Date(article.updatedAt).toLocaleDateString()}
              </span>
              <Typography variant="h3">{article.title}</Typography>
            </CardHeader>
            <CardContent>
              <span className="text-muted-foreground">
                {article.description}
              </span>
            </CardContent>
            <CardFooter>
              <Link href={`/articles/${article.slug}`} className="text-primary">
                Voir Plus
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Page>
  );
}
