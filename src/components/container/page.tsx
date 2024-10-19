import { twc } from "react-twc";
import { Separator } from "../ui/separator";

export const Page = twc.div`[&_section:first-child]:pt-16 [&_section:last-child]:pb-16 [&_section]:mx-auto [&_section]:w-full [&_section]:max-w-screen-xl [&_section]:px-6 [&_section]:py-12 [&_section]:space-y-4`;

export const PageSeparator = twc(
  Separator
)`mx-auto max-w-[calc(1280px-3rem)] w-full`;
