import { Footer } from "@/features/layout/footer";
import { Navbar } from "@/features/layout/navbar/navbar";
import { auth } from "@/lib/auth";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams) {
  const session = await auth();

  return (
    <div className="grid size-full grid-cols-1 grid-rows-[auto_1fr]">
      <Navbar />
      <div className="grid h-full grid-cols-1 grid-rows-[1fr_auto] overflow-y-scroll">
        {session?.user ? (
          <main className="flex flex-col">{children}</main>
        ) : (
          <div>Vous n'êtes pas autorisé</div>
        )}
        <Footer />
      </div>
    </div>
  );
}
