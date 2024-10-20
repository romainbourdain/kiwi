import { getLatestArticles } from "@/actions/articles.action";
import { Grid } from "@/components/container/grid";
import { Text } from "@/components/typography/text";
import { Suspense } from "react";
import { ArticleCard, LoadingArticleCard } from "./article-card";

export type ArticleGridProps = {
  limit: number;
};

export const ArticleGrid = ({ limit }: ArticleGridProps) => {
  return (
    <Suspense fallback={<ArticleGridSkeleton limit={limit} />}>
      <ArticleGridContent limit={limit} />
    </Suspense>
  );
};

const ArticleGridContent = async ({ limit }: ArticleGridProps) => {
  const res = await getLatestArticles({ limit });

  if (!res?.data) {
    return (
      <Text variant="lg" className="font-bold">
        Aucun article
      </Text>
    );
  }

  const { data: articles } = res;

  return (
    <Grid className="grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          author={article.author}
          views={article._count.views}
          likes={article._count.likes}
          tags={article.tags}
        />
      ))}
    </Grid>
  );
};

const ArticleGridSkeleton = ({ limit }: ArticleGridProps) => {
  return (
    <Grid className="grid-cols-3 gap-4">
      {new Array(limit).fill(0).map((_, id) => (
        <LoadingArticleCard key={id} />
      ))}
    </Grid>
  );
};
