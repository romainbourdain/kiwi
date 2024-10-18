import { Center } from "@/components/container/center";
import { Typography } from "@/components/typography/text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { providerMap } from "@/lib/auth";
import type { PageParams } from "@/types/next";
import { ProviderButton } from "../../../src/features/auth/provider-button";

export default async function RoutePage({}: PageParams) {
  return (
    <Center>
      <Card>
        <CardHeader>
          <Typography variant="h3">Se connecter</Typography>
          <Typography variant="sm" color="secondary">
            Se connecter pour accéder à tous les cours !
          </Typography>
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
