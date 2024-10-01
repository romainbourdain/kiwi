import { Title } from "@/components/typography/title";
import type { PageParams } from "@/types/next";

export default async function RoutePage({}: PageParams) {
  return (
    <div>
      <Title>Articles</Title>
    </div>
  );
}
