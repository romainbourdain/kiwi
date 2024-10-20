"use server";

import { db } from "@/lib/db";

export const getLatestArticles = async (limit: number) => {
  return await db.article.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      tags: true,
      _count: {
        select: {
          views: true,
          likes: true,
        },
      },
    },
  });
};

export const getArticleBySlug = async (slug: string) => {
  return await db.article.findUnique({
    where: {
      slug,
    },
    include: {
      author: true,
      tags: true,
      _count: {
        select: {
          views: true,
          likes: true,
          comments: true,
        },
      },
    },
  });
};
