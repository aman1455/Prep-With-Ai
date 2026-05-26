import { useContext, type ReactNode } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      {user && <main className="pt-2">{children}</main>}
    </div>
  );
};

export default DashboardLayout;
