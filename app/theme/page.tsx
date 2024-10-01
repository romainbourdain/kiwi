import { Row } from "@/components/container/row";
import { Caption, Text } from "@/components/typography/text";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { PageParams } from "@/types/next";
import { Bell, Check } from "lucide-react";

export default async function RoutePage({}: PageParams) {
  return (
    <div className="mx-auto grid max-w-screen-lg grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <Title variant="h3">Notifications</Title>
          <Caption>You have 3 unread messages.</Caption>
        </CardHeader>
        <CardContent>
          <Row className="gap-4 rounded-md border p-3">
            <Bell className="size-6" />
            <div className="flex flex-col">
              <Text className="font-bold">Push Notifications</Text>
              <Caption>Send notifications to device.</Caption>
            </div>
          </Row>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="neutral">
            <Check className="size-4" /> Mark as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
