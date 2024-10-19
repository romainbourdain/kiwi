import { twx } from "@/lib/twx";
import { Separator } from "../ui/separator";

export const Page = twx.div`[&_section:first-child]:pt-16 [&_section:last-child]:pb-16 [&_section]:mx-auto [&_section]:w-full [&_section]:max-w-screen-xl [&_section]:px-6 [&_section]:py-12 [&_section]:space-y-4`;

export const PageSeparator = () => (
  <div className="mx-auto w-full max-w-screen-xl px-6">
    <Separator />
  </div>
);
