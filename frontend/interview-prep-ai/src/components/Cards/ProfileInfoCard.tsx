import { UserButton, useUser } from "@clerk/clerk-react";

const ProfileInfoCard = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-3">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "w-8 h-8",
            userButtonOuterIdentifier: "text-text-primary text-sm",
          },
        }}
      />
      <div className="hidden sm:block">
        <div className="text-sm font-medium text-text-primary leading-tight">
          {user?.fullName || "User"}
        </div>
        <div className="text-[11px] text-text-muted mt-0.5">
          {user?.primaryEmailAddress?.emailAddress || ""}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
