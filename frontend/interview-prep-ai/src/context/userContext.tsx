import { createContext, useState, useEffect, type ReactNode } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export interface User {
  name: string;
  email: string;
  profileImageUrl?: string;
  token?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  updateUser: () => {},
  clearUser: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.AUTH.GET_PROFILE
        );
        setUser(response.data);
      } catch {
        console.error("User is not authenticated");
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token || "");
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
