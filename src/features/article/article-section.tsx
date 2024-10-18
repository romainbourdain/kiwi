import { getLatestArticles } from "@/actions/articles.action";
import { Suspense } from "react";
import { ArticleCard, LoadingArticleCard } from "./article-card";

export type ArticleSectionProps = {
  limit: number;
};

export const ArticleSection = async ({ limit }: ArticleSectionProps) => {
  const articles = await getLatestArticles(limit);

  return (
    <div className="grid grid-cols-3 gap-4">
      {articles.map((article) => (
        <Suspense key={article.slug} fallback={<LoadingArticleCard />}>
          <ArticleCard
            article={article}
            author={article.author}
            views={article._count.views}
            likes={article._count.likes}
            tags={article.tags}
          />
        </Suspense>
      ))}
    </div>
  );
};
