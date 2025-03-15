import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the language context type
type LanguageContextType = {
  language: "en" | "bs";
  toggleLanguage: () => void;
};

// Create the Language Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Custom hook to use the Language Context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Define the props for the LanguageProvider, including children
interface LanguageProviderProps {
  children: ReactNode;
}

// LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<"en" | "bs">("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "bs" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
