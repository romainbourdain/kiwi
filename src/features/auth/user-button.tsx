import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import SignInButton from "./sign-in-button";
import { UserDropdown } from "./user-dropdown";

export const UserButton = async () => {
  const session = await auth();

  if (!session?.user) return <SignInButton />;

  return (
    <UserDropdown>
      <button>
        <Avatar className="size-9">
          {session.user.image && <AvatarImage src={session.user.image} />}
          <AvatarFallback>
            {session.user.name?.slice(0, 1).toUpperCase() || ""}
          </AvatarFallback>
        </Avatar>
      </button>
    </UserDropdown>
  );
};
