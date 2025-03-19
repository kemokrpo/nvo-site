import ThemeToggle from "@/components/ToggleButtons/ThemeToggle"; // Your theme toggle button component
import LanguageToggle from "@/components/ToggleButtons/LanguageToggle"; // Your language toggle component

const Header = () => {
    return (
      <header className="w-full p-1 flex justify-between items-center bg-green-800 text-xs fixed top-0 left-0 z-20">
        <div className="font-bold text-xs"></div>
        <div className="flex items-center space-x-1 mt-1 mr-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>
    );
  };
  

export default Header;
