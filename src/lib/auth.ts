import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Github from "next-auth/providers/github";
import { db } from "./db";
import { env } from "./env";

const providers: Provider[] = [Github];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers,
  pages: {
    signIn: "/auth/sign-in",
  },
});
