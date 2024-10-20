import { getAuth } from "@/actions/user.action";
import type { User } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function handleServerError(e: Error) {
  if (e instanceof ActionError) {
    return e.message;
  }

  return "An unexpected error occurred";
}

export const actionClient = createSafeActionClient({
  handleServerError,
});

export const getUser = async () => {
  const user = await getAuth();

  if (!user) {
    throw new ActionError("Session not found!");
  }

  // In the real world, you would check if the session is valid by querying a database.
  // We'll keep it very simple here.

  if (!user.id || !user.email) {
    throw new ActionError("Session is not valid!");
  }

  return user as User;
};

export const authActionClient = createSafeActionClient({
  handleServerError,
}).use(async ({ next }) => {
  const user = await getUser();

  return next({
    ctx: {
      user: user as User,
    },
  });
});
