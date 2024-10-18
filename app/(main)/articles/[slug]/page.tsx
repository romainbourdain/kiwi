import { Page } from "@/components/container/page";
import { Typography } from "@/components/typography/text";
import { Separator } from "@/components/ui/separator";
import { MDX } from "@/features/mdx/mdx";
import { db } from "@/lib/db";
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
        <Typography variant="sm" color="secondary">
          {new Date(article.updatedAt).toLocaleDateString("fr-FR")}
        </Typography>
        <Typography variant="h1">{article.title}</Typography>
        <Typography variant="p">{article.description}</Typography>
        <Separator />
        <div className="">
          <MDX source={article.content} />
        </div>
      </div>
      <aside className="size-full">
        <Typography variant="h3">Table des matières</Typography>
      </aside>
    </Page>
  );
}
