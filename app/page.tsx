import { auth } from "@/lib/auth";
import type { PageParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RoutePage({}: PageParams) {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return <div></div>;
}
