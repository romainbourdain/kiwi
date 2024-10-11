import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { z } from "zod";

const db = new PrismaClient();

const articleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

async function seedArticle() {
  const articleDir = path.join(__dirname, "../content/articles");

  const files = await fs.readdir(articleDir);
  const fileNames = files.filter((f) => f.endsWith(".mdx"));

  for await (const fileName of fileNames) {
    const fullPath = path.join(articleDir, fileName);
    const fileContent = await fs.readFile(fullPath, "utf-8");
    const frontMatter = matter(fileContent);

    const safeData = articleSchema.safeParse(frontMatter.data);

    if (!safeData.success) {
      console.error(`Error parsing file: ${fileName}`);
      safeData.error.errors.forEach((issue) => {
        console.error(`  - ${issue.path.join(" -> ")}: ${issue.message}`);
      });
      continue;
    }

    const slug = fileName.replace(/^(0\d+-)/, "").replace(/\.mdx$/, "");
    const data = {
      ...safeData.data,
      slug,
      content: frontMatter.content,
    };

    const currentData = await db.article.findUnique({ where: { slug } });
    if (currentData) await db.article.update({ where: { slug }, data });
    else await db.article.create({ data });
  }
}

seedArticle();
