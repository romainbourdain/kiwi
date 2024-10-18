import { getLatestArticles } from "@/actions/articles.action";
import { Page } from "@/components/container/page";
import { Typography } from "@/components/typography/text";
import { Separator } from "@/components/ui/separator";
import { ArticleSection } from "@/features/article/article-section";
import { CourseCard } from "@/features/course/course-card";
import { HomeCard } from "@/features/home/home-card";
import { StatCard } from "@/features/profile/stat-card";
import { auth } from "@/lib/auth";
import type { PageParams } from "@/types/next";
import { Book, Calendar, Clock, GraduationCap, Newspaper } from "lucide-react";

export default async function RoutePage({}: PageParams) {
  const session = await auth();
  const articles = await getLatestArticles(6 * 60);

  return (
    <Page>
      <div className="flex flex-col gap-2">
        <Typography variant="h1">Bienvenue {session?.user?.name} !</Typography>
        <Typography variant="sm" color="secondary">
          Prends ton envol dès aujourd'hui
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Newspaper}>
          <Typography variant="h3">Articles</Typography>
          <Typography variant="h3">0</Typography>
          <Typography variant="sm" color="secondary">
            Écrits au total
          </Typography>
        </StatCard>
        <StatCard icon={GraduationCap}>
          <Typography variant="h3">Cours</Typography>
          <Typography variant="h3">0</Typography>
          <Typography variant="sm" color="secondary">
            Terminés
          </Typography>
        </StatCard>
        <StatCard icon={Calendar} className="row-span-2">
          <Typography variant="h3">Activité</Typography>
        </StatCard>
        <StatCard icon={Book}>
          <Typography variant="h3">Exercices</Typography>
          <Typography variant="h3">0</Typography>
          <Typography variant="sm" color="secondary">
            Réussis
          </Typography>
        </StatCard>
        <StatCard icon={Clock}>
          <Typography variant="h3">Jours d'affilés</Typography>
          <Typography variant="h3">0</Typography>
          <Typography variant="sm" color="secondary">
            Record de 0 jours
          </Typography>
        </StatCard>
      </div>
      <Separator />
      <div className="space-y-4">
        <Typography variant="h2">Commencer à apprendre</Typography>
        <div className="grid grid-cols-3 gap-4">
          <HomeCard
            title="Cours"
            subtitle="Apprenez des nouvelles notions"
            icon={GraduationCap}
            image="/image/home-card/blue.svg"
            href="/courses"
          />
          <HomeCard
            title="Exercices"
            subtitle="Progresser en pratiquant d'avantage"
            icon={Book}
            image="/image/home-card/purple.svg"
            href="/exercises"
          />
          <HomeCard
            title="Article"
            subtitle="Accédez à du contenu vulgarisé"
            icon={Newspaper}
            image="/image/home-card/red.svg"
            href="/articles"
          />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Typography variant="h2">Cours les plus populaires</Typography>
        <div className="grid grid-cols-1 gap-2">
          <CourseCard
            href=""
            image="/image/icons/javascript.png"
            title="Formation JavaScript"
            subtitle="Découvrez le langage de programmation JavaScript"
          />
          <CourseCard
            href=""
            image="/image/icons/javascript.png"
            title="Formation JavaScript"
            subtitle="Découvrez le langage de programmation JavaScript"
          />
          <CourseCard
            href=""
            image="/image/icons/javascript.png"
            title="Formation JavaScript"
            subtitle="Découvrez le langage de programmation JavaScript"
          />
          <CourseCard
            href=""
            image="/image/icons/javascript.png"
            title="Formation JavaScript"
            subtitle="Découvrez le langage de programmation JavaScript"
          />
          <CourseCard
            href=""
            image="/image/icons/javascript.png"
            title="Formation JavaScript"
            subtitle="Découvrez le langage de programmation JavaScript"
          />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Typography variant="h2">Derniers articles</Typography>
        <ArticleSection limit={6} />
      </div>
    </Page>
  );
}
