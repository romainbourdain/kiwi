"use server";

import { auth as baseAuth } from "@/lib/auth";
import type { User } from "@prisma/client";

export const getAuth = async () => {
  const session = await baseAuth();

  if (session?.user) {
    const user = session.user as User;
    return user;
  }

  return null;
};

export const requireAuth = async () => {
  const session = await baseAuth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user as User;
};
