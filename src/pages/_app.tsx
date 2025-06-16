import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import JobFairLayout from "@/pages/jobfair/components/Layout/Layout";
import HackathonLayout from "@/pages/hackathon/components/Layout/Layout";
import CourseLayout from "@/pages/course/components/Layout/Layout";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

// Create the Unlock Context
const UnlockContext = createContext<{
  isUnlocked: boolean;
  setUnlocked: (unlocked: boolean) => void;
}>({
  isUnlocked: false,
  setUnlocked: () => {},
});

// Export a hook to use the unlock context
export const useUnlock = () => useContext(UnlockContext);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isUnlocked, setUnlocked] = useState(false); // Global unlock state

  // Log unlock state for debugging
  useEffect(() => {
    console.log("isUnlocked state:", isUnlocked);
  }, [isUnlocked]);

  // Redirect logic
  useEffect(() => {
    const currentPath = router.pathname;

    if (!isUnlocked && currentPath !== "/countdown") {
      router.push("/countdown");
    } else if (isUnlocked && currentPath === "/countdown") {
      router.push("/"); // Redirect back to homepage if unlocked
    }
  }, [isUnlocked, router]);

  // Layout selection
  let SelectedLayout = Layout;
  if (router.pathname.startsWith("/jobfair")) {
    SelectedLayout = JobFairLayout;
  } else if (router.pathname.startsWith("/hackathon")) {
    SelectedLayout = HackathonLayout;
  } else if (router.pathname.startsWith("/course")) {
    SelectedLayout = CourseLayout;
  }

  return (
    <UnlockContext.Provider value={{ isUnlocked, setUnlocked }}>
      <LanguageProvider>
        <AuthProvider>
          <SelectedLayout>
            <Component {...pageProps} />
          </SelectedLayout>
        </AuthProvider>
      </LanguageProvider>
    </UnlockContext.Provider>
  );
}
