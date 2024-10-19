import { Center } from "@/components/container/flex";
import { Text } from "@/components/typography/text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { providerMap } from "@/lib/auth";
import type { PageParams } from "@/types/next";
import { ProviderButton } from "../../../src/features/auth/provider-button";

export default async function RoutePage({}: PageParams) {
  return (
    <Center>
      <Card>
        <CardHeader>
          <Text variant="h3">Se connecter</Text>
          <Text variant="muted">
            Se connecter pour accéder à tous les cours !
          </Text>
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
