import { Page } from "@/components/container/page";
import { Text } from "@/components/typography/text";
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
      <Text variant="h1">Articles</Text>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <Card key={article.slug}>
            <CardHeader>
              <Text variant="muted">
                {new Date(article.updatedAt).toLocaleDateString("fr-FR")}
              </Text>
              <Text variant="h3">{article.title}</Text>
            </CardHeader>
            <CardContent>
              <Text variant="muted">{article.description}</Text>
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
