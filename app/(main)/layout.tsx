import { Footer } from "@/features/layout/footer";
import { Navbar } from "@/features/layout/navbar";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams) {
  return (
    <div className="grid size-full grid-cols-1 grid-rows-[auto_1fr]">
      <Navbar />
      <div className="overflow-y-scroll">
        <div className="grid-rows-[1fr_auto]">
          <main className="mx-auto size-full h-full min-h-screen max-w-screen-md px-5 py-7">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
