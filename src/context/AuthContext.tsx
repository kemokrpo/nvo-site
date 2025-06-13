
import React, { createContext, useContext, useState, useEffect } from "react";
import useCheckAuth from "@/hooks/useCheckAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isLoading } = useCheckAuth(); // Use the updated hook
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("pocketbase_auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};