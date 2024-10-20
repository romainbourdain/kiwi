"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import {
  findLike,
  getArticleCommentsBySlug,
  getArticleContentBySlug,
  getArticleInfoWithoutContentBySlug,
  getLatestArticlesFromDb,
  revalidateArticlePaths,
  toggleLike,
  viewArticle,
} from "./articles.helper";

const latestArticleSchema = z.object({ limit: z.number() });
const articleBySlugSchema = z.object({ slug: z.string() });

const likeArticleSchema = z.object({ articleId: z.string() });

/**
 * Fetches the latest articles based on a specified limit.
 */
export const getLatestArticles = authActionClient
  .schema(latestArticleSchema)
  .action(async ({ parsedInput: { limit } }) => {
    return await getLatestArticlesFromDb(limit);
  });

/**
 * Retrieves article information based on the provided slug and user context. This function is used for header of the article
 */
export const getArticleInfos = authActionClient
  .schema(articleBySlugSchema)
  .action(async ({ parsedInput: { slug }, ctx: { user } }) => {
    const article = await getArticleInfoWithoutContentBySlug(slug);
    if (!article) return null;

    const latestLike = await findLike(slug, user.id);
    return { isLiked: !!latestLike, ...article };
  });

/**
 * Retrieves the content of an article based on the provided slug. This function also add a view if the article has not been read.
 */
export const getArticleContent = authActionClient
  .schema(articleBySlugSchema)
  .action(async ({ parsedInput: { slug }, ctx: { user } }) => {
    const content = await getArticleContentBySlug(slug);
    if (!content) return null;

    await viewArticle(slug, user.id);

    return content;
  });

/**
 * Retrieves all comments associated with a specific article identified by its slug.
 * This function ensures that the comments are fetched from the database and returned
 * for further processing or display.
 */
export const getArticleComments = authActionClient
  .schema(articleBySlugSchema)
  .action(async ({ parsedInput: { slug } }) => {
    return await getArticleCommentsBySlug(slug);
  });

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
