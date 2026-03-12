import { createContext, useContext, useState, ReactNode } from "react";

export interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData;
  login: (data: UserData) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const defaultUser: UserData = { name: "", email: "", phone: "" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData>(defaultUser);

  const login = (data: UserData) => {
    setUser(data);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(defaultUser);
    setIsLoggedIn(false);
  };

  const updateProfile = (data: Partial<UserData>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
