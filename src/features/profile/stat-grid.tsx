import { Grid } from "@/components/container/grid";
import { Text } from "@/components/typography/text";
import { Book, Calendar, Clock, GraduationCap, Newspaper } from "lucide-react";
import { StatCard } from "./stat-card";

export const StatGrid = () => {
  return (
    <Grid className="grid-cols-3 gap-4">
      <StatCard icon={Newspaper}>
        <Text variant="h3">Articles</Text>
        <Text variant="h3">0</Text>
        <Text variant="muted">Écrits au total</Text>
      </StatCard>
      <StatCard icon={GraduationCap}>
        <Text variant="h3">Cours</Text>
        <Text variant="h3">0</Text>
        <Text variant="muted">Terminés</Text>
      </StatCard>
      <StatCard icon={Calendar} className="row-span-2">
        <Text variant="h3">Activité</Text>
      </StatCard>
      <StatCard icon={Book}>
        <Text variant="h3">Exercices</Text>
        <Text variant="h3">0</Text>
        <Text variant="muted">Réussis</Text>
      </StatCard>
      <StatCard icon={Clock}>
        <Text variant="h3">Jours d'affilés</Text>
        <Text variant="h3">0</Text>
        <Text variant="muted">Record de 0 jours</Text>
      </StatCard>
    </Grid>
  );
};
