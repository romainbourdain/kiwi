import type { User } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const getDate = (date: Date) => {
  return format(date, "dd/MM/yyyy", { locale: fr });
};
export const getDateTime = (date: Date) => {
  return format(date, "dd/MM/yyyy h:mm", { locale: fr });
};

export const getUserFallback = (user: User) => {
  return `${user.name?.[0].toUpperCase()}${user.name?.[1]}`;
};
