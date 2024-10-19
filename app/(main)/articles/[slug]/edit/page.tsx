import { Page } from "@/components/container/page";
import { Text } from "@/components/typography/text";
import { CreateArticleForm } from "@/features/article/create-article-form";
import { db } from "@/lib/db";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";

export default async function RoutePage({
  params: { slug },
}: PageParams<{ slug: string }>) {
  const article = await db.article.findUnique({ where: { slug } });

  if (!article) return notFound();
  return (
    <Page>
      <Text variant="h1">Modifier l'article</Text>
      <CreateArticleForm defaultValues={article} id={article.id} />
    </Page>
  );
}
