import { Protected } from "@/features/auth/protected";
import { Footer } from "@/features/layout/footer";
import { Navbar } from "@/features/layout/navbar/navbar";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams) {
  return (
    <div className="grid size-full grid-cols-1 grid-rows-[auto_1fr]">
      <Navbar />
      <div className="grid h-full grid-cols-1 grid-rows-[1fr_auto] overflow-y-scroll">
        <Protected>
          <main>{children}</main>
        </Protected>
        <Footer />
      </div>
    </div>
  );
}
