import { Page, PageSeparator } from "@/components/container/page";
import { Text } from "@/components/typography/text";
import { ArticleGrid } from "@/features/article/article-grid";
import { CourseGrid } from "@/features/course/course-grid";
import { NavigationGrid } from "@/features/home/navigation-grid";
import { Welcome } from "@/features/home/welcome";
import { StatGrid } from "@/features/profile/stat-grid";
import type { PageParams } from "@/types/next";

export default async function RoutePage({}: PageParams) {
  return (
    <Page>
      <section>
        <Welcome />
        <StatGrid />
      </section>
      <PageSeparator />
      <section>
        <Text variant="h2">Commencer à apprendre</Text>
        <NavigationGrid />
      </section>
      <PageSeparator />
      <section>
        <Text variant="h2">Cours les plus populaires</Text>
        <CourseGrid limit={6} />
      </section>
      <PageSeparator />
      <section>
        <Text variant="h2">Derniers articles</Text>
        <ArticleGrid limit={6} />
      </section>
    </Page>
  );
}
