import { Page, PageSeparator } from "@/components/container/page";
import { ArticleComments } from "@/features/article/article-comments";
import { ArticleContent } from "@/features/article/article-content";
import { ArticleHeader } from "@/features/article/article-header";
import type { PageParams } from "@/types/next";

export default async function RoutePage({
  params: { slug },
}: PageParams<{ slug: string }>) {
  return (
    <Page>
      <section>
        <ArticleHeader slug={slug} />
      </section>
      <PageSeparator />
      <section>
        <ArticleContent slug={slug} />
      </section>
      <PageSeparator />
      <section>
        <ArticleComments slug={slug} />
      </section>
    </Page>
  );
}
