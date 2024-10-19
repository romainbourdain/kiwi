import { Grid } from "@/components/container/grid";
import { Book, GraduationCap, Newspaper } from "lucide-react";
import { HomeCard } from "./home-card";

export const NavigationGrid = () => {
  return (
    <Grid className="grid-cols-3 gap-4">
      <HomeCard
        title="Cours"
        subtitle="Apprenez des nouvelles notions"
        icon={GraduationCap}
        image="/images/home-card/blue.svg"
        href="/courses"
      />
      <HomeCard
        title="Exercices"
        subtitle="Progresser en pratiquant d'avantage"
        icon={Book}
        image="/images/home-card/purple.svg"
        href="/exercises"
      />
      <HomeCard
        title="Article"
        subtitle="Accédez à du contenu vulgarisé"
        icon={Newspaper}
        image="/images/home-card/red.svg"
        href="/articles"
      />
    </Grid>
  );
};
