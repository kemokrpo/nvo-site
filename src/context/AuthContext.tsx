
import React, { createContext, useContext, useState, useEffect } from "react";
import useCheckAuth from "@/hooks/useCheckAuth";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useCheckAuth(); // Use the custom hook here
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn); // Update state when login status changes
  }, [isLoggedIn]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("pocketbase_auth"); // Clear auth data
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};