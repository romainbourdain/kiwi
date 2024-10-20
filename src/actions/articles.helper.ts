import { db } from "@/lib/db";
import type { Like } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Fetches the latest articles from the database, ordered by creation date.
 *
 * @param {number} limit - The maximum number of articles to fetch.
 * @returns {Promise<any>} The list of latest articles with author, tags, and counts.
 */
export async function getLatestArticlesFromDb(limit: number) {
  return await db.article.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      tags: true,
      _count: {
        select: { views: true, likes: true, comments: true },
      },
    },
  });
}

/**
 * Fetches all article data except the content by its slug from the database.
 *
 * @param {string} slug - The unique slug of the article.
 * @returns {Promise<any | null>} The article without the content, or null if not found.
 */
export async function getArticleInfoWithoutContentBySlug(slug: string) {
  return await db.article.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      author: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
      slug: true,
      _count: {
        select: { views: true, likes: true, comments: true },
      },
    },
  });
}

/**
 * Fetches the content of an article by its slug from the database.
 *
 * @param {string} slug - The unique slug of the article.
 * @returns {Promise<string | null>} The content of the article, or null if not found.
 */
export async function getArticleContentBySlug(slug: string) {
  const article = await db.article.findUnique({
    where: { slug },
    select: {
      content: true,
    },
  });
  return article?.content || null;
}

/**
 * Retrieves comments for a specific article from the database based on the provided slug.
 *
 * @param {string} slug - The slug of the article for which to retrieve comments.
 * @returns {Promise<Array<Comment>>} A promise that resolves to an array of comments,
 * each including the author information, ordered by creation date in descending order.
 */
export async function getArticleCommentsBySlug(slug: string) {
  return await db.comment.findMany({
    where: {
      articleSlug: slug,
    },
    include: {
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Handles viewing an article by updating the view count if necessary.
 *
 * @param {string} articleSlug - The slug of the article.
 * @param {string} userId - The ID of the user viewing the article.
 * @returns {Promise<void>} Nothing is returned, but the view is updated in the database if conditions are met.
 */
export async function viewArticle(articleSlug: string, userId: string) {
  const viewCountDown = 1000 * 60 * 60 * 24; // 24 heures
  const view = await findView(articleSlug, userId);
  if (!view || view.createdAt < new Date(Date.now() - viewCountDown)) {
    await createView(articleSlug, userId);
    revalidateArticlePaths(articleSlug);
  }
}

/**
 * Finds a view record for a given article slug and user ID.
 *
 * @param {string} articleSlug - The slug of the article.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any | null>} The view record or null if not found.
 */
export async function findView(articleSlug: string, userId: string) {
  return await db.view.findFirst({
    where: { articleSlug, userId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Creates a new view record for an article and user.
 *
 * @param {string} articleSlug - The slug of the article.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any>} The created view record.
 */
export async function createView(articleSlug: string, userId: string) {
  return await db.view.create({
    data: { articleSlug, userId },
  });
}

/**
 * Finds a like record for a given article slug and user ID.
 *
 * @param {string} articleSlug - The slug of the article.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any | null>} The like record or null if not found.
 */
export async function findLike(articleSlug: string, userId: string) {
  return await db.like.findFirst({
    where: { articleSlug, userId },
  });
}

/**
 * Toggles the like status for an article for a specific user.
 * If the article is already liked, the like is removed, otherwise, a like is added.
 *
 * @param {string} articleSlug - The slug of the article.
 * @param {string} userId - The ID of the user.
 * @param {Like | null} currentLike - The current like object, if any.
 * @returns {Promise<void>} Nothing is returned, but the like status is updated in the database.
 */
export async function toggleLike(
  articleSlug: string,
  userId: string,
  currentLike: Like | null
) {
  if (currentLike) {
    await db.like.delete({
      where: { id: currentLike.id },
    });
  } else {
    await db.like.create({
      data: { articleSlug, userId },
    });
  }
}

/**
 * Revalidates the necessary paths for a given article slug.
 * This ensures that the cached pages related to the article are updated.
 *
 * @param {string} slug - The slug of the article.
 * @returns {void}
 */
export function revalidateArticlePaths(slug: string) {
  revalidatePath(`/home`);
  revalidatePath(`/articles`);
  revalidatePath(`/articles/${slug}`);
}
