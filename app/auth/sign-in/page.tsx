import { Center } from "@/components/container/center";
import { Caption } from "@/components/typography/text";
import { Title } from "@/components/typography/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { providerMap } from "@/lib/auth";
import type { PageParams } from "@/types/next";
import { ProviderButton } from "../../../src/features/auth/provider-button";

export default async function RoutePage({}: PageParams) {
  return (
    <Center>
      <Card>
        <CardHeader>
          <Title variant="h3">Se connecter</Title>
          <Caption>Se connecter pour accéder à tous les cours !</Caption>
        </CardHeader>
        <CardContent>
          {Object.values(providerMap).map((provider) => (
            <ProviderButton key={provider.id} provider={provider} />
          ))}
        </CardContent>
      </Card>
    </Center>
  );
}
