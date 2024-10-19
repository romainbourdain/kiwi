import { Page } from "@/components/container/page";
import { Text } from "@/components/typography/text";
import { Separator } from "@/components/ui/separator";
import { MDX } from "@/features/mdx/mdx";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils/date";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";

export default async function RoutePage({
  params: { slug },
}: PageParams<{ slug: string }>) {
  const article = await db.article.findUnique({ where: { slug } });

  if (!article) return notFound();

  return (
    <Page className="grid grid-cols-[auto_1fr] gap-6">
      <div className="w-full max-w-screen-md space-y-4">
        <Text variant="muted">{formatDate(article.updatedAt)}</Text>
        <Text variant="h1">{article.title}</Text>
        <Text variant="p">{article.description}</Text>
        <Separator />
        <div className="">
          <MDX source={article.content} />
        </div>
      </div>
      <aside className="size-full">
        <Text variant="h3">Table des matières</Text>
      </aside>
    </Page>
  );
}
