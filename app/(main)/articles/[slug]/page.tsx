import { Spinner } from "@/components/animation/spinner";
import { Center } from "@/components/container/center";
import { Caption } from "@/components/typography/text";
import { MDX } from "@/features/mdx/mdx";
import { db } from "@/lib/db";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function RoutePage({
  params: { slug },
}: PageParams<{ slug: string }>) {
  const article = await db.article.findUnique({ where: { slug } });

  if (!article) return notFound();

  return (
    <Suspense
      fallback={
        <Center className="py-5">
          <Spinner className="size-10" />
        </Center>
      }
    >
      <div className="prose prose-sm dark:prose-invert lg:prose-lg">
        <Caption>{new Date(article.updatedAt).toLocaleDateString()}</Caption>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <div>
          <MDX source={article.content} />
        </div>
      </div>
    </Suspense>
  );
}
