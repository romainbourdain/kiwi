import { getArticleBySlug } from "@/actions/articles.action";
import { Grid } from "@/components/container/grid";
import { Mdx } from "@/components/mdx/mdx";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export type ArticleContentProps = {
  slug: string;
};

export const ArticleContent = ({ slug }: ArticleContentProps) => {
  return (
    <Grid className="w-full grid-cols-[auto_1fr]">
      <article className="w-full max-w-screen-md">
        <Suspense fallback={<ArticleContentSkeleton />}>
          <ArticleContentContent slug={slug} />
        </Suspense>
      </article>
      <aside className=""></aside>
    </Grid>
  );
};

const ArticleContentContent = async ({ slug }: ArticleContentProps) => {
  const res = await getArticleBySlug({ slug });

  if (!res?.data) return notFound();

  const { data: article } = res;

  return <Mdx source={article.content} />;
};

const ArticleContentSkeleton = () => {
  return (
    <>
      <Skeleton className="mb-10 h-[45px] w-full rounded-full" />
      <Skeleton className="mb-6 h-[28px] w-full rounded-full" />
      {new Array(10).fill(0).map((_, index) => (
        <Skeleton key={index} className="mb-2 h-[16px] w-full rounded-full" />
      ))}
      <Skeleton className="mb-6 mt-12 h-[28px] w-full rounded-full" />
      {new Array(5).fill(0).map((_, index) => (
        <Skeleton key={index} className="mb-2 h-[16px] w-full rounded-full" />
      ))}
      <Skeleton className="mb-2 mt-8 h-[200px] w-full rounded-md" />
    </>
  );
};

/*
const fakeMarkdown = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quisquam dolor esse unde corrupti, sapiente ducimus aspernatur excepturi soluta a, consectetur eos ipsum molestiae nisi facilis. Unde nobis molestiae ipsam optio culpa earum numquam, ullam molestias, minima assumenda eaque deserunt consequuntur, laudantium incidunt consectetur veniam recusandae asperiores quis ea ab!

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quisquam dolor esse unde corrupti, sapiente ducimus aspernatur excepturi

<Warning>This is a warning</Warning>
<Tip>This is a tip</Tip>
<Danger>This is a danger</Danger>
<Info>This is an info</Info>

\`\`\`javascript showLineNumbers
console.log("Hello World!");
\`\`\`

Lorem ipsum dolor sit amet **consectetur** adipisicing elit. Facere quisquam dolor esse unde corrupti, sapiente ducimus aspernatur excepturi \`inlinecode\` soluta a, consectetur eos ipsum molestiae nisi facilis. Unde nobis molestiae ipsam optio culpa earum numquam, ullam molestias, minima assumenda eaque deserunt consequuntur, laudantium incidunt consectetur __veniam__ recusandae asperiores quis ea ab!

Lorem ipsum dolor sit amet *consectetur* adipisicing elit. _Facere_ quisquam dolor esse unde corrupti, sapiente ducimus aspernatur excepturi \`inlinecode\` soluta a, consectetur eos ipsum molestiae nisi facilis. Unde nobis molestiae ipsam optio culpa earum numquam, ullam molestias, minima assumenda eaque deserunt consequuntur, laudantium incidunt consectetur veniam recusandae asperiores quis ea ab! [google](https://google.com)

---

Lorem ipsum dolor sit amet *consectetur* adipisicing elit. _Facere_ quisquam dolor esse unde corrupti, sapiente ducimus aspernatur excepturi \`inlinecode\` soluta a, consectetur eos ipsum molestiae nisi facilis. Unde nobis molestiae ipsam optio culpa earum numquam, ullam molestias, minima assumenda eaque deserunt consequuntur, laudantium incidunt consectetur veniam recusandae asperiores quis ea ab! [google]()

- List item 1
- List item 2
    - List item 2.1
- List item 3

1. Numbered item 1
    1. Numbered item 1.1
2. Numbered item 2
3. Numbered item 3
`;
 */
