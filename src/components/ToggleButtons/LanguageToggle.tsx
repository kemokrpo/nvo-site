import { useLanguage } from "@/context/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-1 text-xs rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white"
    >
      {language === "en" ? "EN" : "BS"}
    </button>
  );
};

export default LanguageToggle;
