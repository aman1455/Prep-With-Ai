import { Link } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  return (
    <nav className="h-16 bg-surface/70 backdrop-blur-xl border-b border-border sticky top-0 z-30">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <h2 className="font-display font-semibold text-sm text-text-primary tracking-tight">
            PrepWithAI
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </nav>
  );
};

export default Navbar;
