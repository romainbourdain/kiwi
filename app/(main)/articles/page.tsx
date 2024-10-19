import { Page } from "@/components/container/page";
import { Text } from "@/components/typography/text";
import { Input } from "@/components/ui/input";
import { ArticleGrid } from "@/features/article/article-grid";
import type { PageParams } from "@/types/next";

export default async function RoutePage({}: PageParams) {
  return (
    <Page>
      <section>
        <Text variant="h1">Articles</Text>
        <Input placeholder="Rechercher" className="pr-8" />
        <ArticleGrid limit={50} />
      </section>
    </Page>
  );
}
