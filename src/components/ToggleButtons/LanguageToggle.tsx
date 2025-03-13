import { useState } from "react";

const LanguageToggle = () => {
  const [language, setLanguage] = useState("en");

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bs" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white"
    >
      {language === "en" ? "EN" : "BS"}
    </button>
  );
};

export default LanguageToggle;
