import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { LuLogOut } from "react-icons/lu";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar
        name={user?.name || ""}
        image={user?.profileImageUrl || ""}
        size="sm"
      />
      <div className="hidden sm:block">
        <div className="text-sm font-medium text-text-primary leading-tight">
          {user?.name || "User"}
        </div>
        <button
          onClick={handleLogOut}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted hover:text-danger transition-colors mt-0.5"
        >
          <LuLogOut size={11} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
