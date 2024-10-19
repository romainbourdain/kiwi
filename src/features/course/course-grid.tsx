import { Grid } from "@/components/container/grid";
import { CourseCard } from "./course-card";

export type CourseGridProps = {
  limit: number;
};

export const CourseGrid = async ({ limit }: CourseGridProps) => {
  // TODO: fetch courses
  return (
    <Grid className="grid-cols-1 gap-2">
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
    </Grid>
  );
};
