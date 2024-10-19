import { getAuth } from "@/actions/user.action";
import { Text } from "@/components/typography/text";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const Welcome = () => {
  return (
    <Suspense fallback={<HeaderSectionSkeleton />}>
      <WelcomeContent />
    </Suspense>
  );
};

export const WelcomeContent = async () => {
  const user = await getAuth();

  return (
    <>
      <Text variant="h1">Bienvenue {user?.name} !</Text>
      <Text variant="muted">Prends ton envol dès aujourd'hui</Text>
    </>
  );
};

export const HeaderSectionSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[30px] w-full rounded-full" />
      <Skeleton className="h-[19px] w-full rounded-full" />
    </>
  );
};
