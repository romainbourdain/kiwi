"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import {
  findLike,
  getArticleBySlugFromDb,
  getLatestArticlesFromDb,
  revalidateArticlePaths,
  toggleLike,
  viewArticle,
} from "./articles.helper";

const latestArticleSchema = z.object({ limit: z.number() });

/**
 * Fetches the latest articles based on a specified limit.
 */
export const getLatestArticles = authActionClient
  .schema(latestArticleSchema)
  .action(async ({ parsedInput: { limit } }) => {
    return await getLatestArticlesFromDb(limit);
  });

const articleBySlugSchema = z.object({ slug: z.string() });

/**
 * Fetches an article by its slug and records a view for the current user.
 * Also checks if the current user has liked the article.
 */
export const getArticleBySlug = authActionClient
  .schema(articleBySlugSchema)
  .action(async ({ parsedInput: { slug }, ctx: { user } }) => {
    const article = await getArticleBySlugFromDb(slug);
    if (!article) return null;

    await viewArticle(slug, user.id);

    const latestLike = await findLike(article.slug, user.id);
    return { isLiked: !!latestLike, ...article };
  });

const likeArticleSchema = z.object({ articleId: z.string() });

/**
 * Toggles the like status for a specific article based on the current user.
 * If the article is already liked, the like is removed, otherwise a like is added.
 * Also triggers revalidation of the article's related paths to update the cached content.
 */
export const likeArticle = authActionClient
  .schema(likeArticleSchema)
  .action(async ({ parsedInput: { articleId }, ctx: { user } }) => {
    const currentLike = await findLike(articleId, user.id);
    await toggleLike(articleId, user.id, currentLike);

    revalidateArticlePaths(articleId);
  });
