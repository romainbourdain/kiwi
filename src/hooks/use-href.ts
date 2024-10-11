import { useIsClient } from "./use-is-client";

export const useHref = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return "";
  }

  const href = window.location.href;

  return `${href}`;
};
