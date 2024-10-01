import { Navbar } from "@/features/layout/navbar";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams) {
  return (
    <div className="grid size-full grid-cols-1 grid-rows-[auto_1fr]">
      <Navbar />
      <div className="overflow-y-scroll px-5 py-7">
        <main className="mx-auto size-full max-w-screen-lg">{children}</main>
        {/* Footer */}
      </div>
    </div>
  );
}
