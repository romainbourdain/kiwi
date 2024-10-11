import { MDX } from "@/features/mdx/mdx";
import type { PageParams } from "@/types/next";

export default async function RoutePage({}: PageParams) {
  return (
    <MDX
      source={`# Notifications
  You have 3 unread messages.

  `}
    />
  );
}
