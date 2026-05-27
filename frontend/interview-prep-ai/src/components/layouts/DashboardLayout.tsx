import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import SpinnerLoader from "../Loader/SpinnerLoader";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-base">
        <Navbar />
        <SpinnerLoader fullscreen size={24} text="Loading..." />
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="pt-2">{children}</main>
    </div>
  );
};

export default DashboardLayout;
