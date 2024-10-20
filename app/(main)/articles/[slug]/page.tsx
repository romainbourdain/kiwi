import { getArticleBySlug } from "@/actions/articles.action";
import { Row } from "@/components/container/flex";
import { Page, PageSeparator } from "@/components/container/page";
import { ArticleMdx } from "@/components/mdx/mdx";
import { Text } from "@/components/typography/text";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PageParams } from "@/types/next";
import { getDate } from "@/utils/format";
import { Eye, Forward, MessageCircle, Star } from "lucide-react";
import { notFound } from "next/navigation";

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

export default async function RoutePage({
  params: { slug },
}: PageParams<{ slug: string }>) {
  const article = await getArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <Page>
      <section>
        <Text variant="muted">{getDate(article.updatedAt)}</Text>
        <Row className="gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag.slug}>{tag.slug}</Badge>
          ))}
        </Row>

        <div className="space-y-3">
          <Text variant="h1">{article.title}</Text>
          <Text variant="p">{article.description}</Text>
        </div>
        <Row className="gap-2">
          <Button variant="outline">
            <Star className="size-4" />
            {article._count.likes}
          </Button>
          <Row
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-transparent"
            )}
          >
            <Eye className="size-4" />
            {article._count.views}
          </Row>
          <Row
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-transparent"
            )}
          >
            <MessageCircle className="size-4" />
            {article._count.comments}
          </Row>
          <Button variant="outline">
            <Forward className="size-4" />
            Partager
          </Button>
        </Row>
      </section>
      <PageSeparator />
      <section>
        <ArticleMdx source={fakeMarkdown} />
      </section>
    </Page>
  );
}
