import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import JobFairLayout from "@/pages/jobfair/components/Layout/Layout";
import HackathonLayout from "@/pages/hackathon/components/Layout/Layout";
import CourseLayout from "@/pages/course/components/Layout/Layout";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  // Layout bazirano na djelu str
  let SelectedLayout = Layout; 
  if (pathname.startsWith("/jobfair")) {
    SelectedLayout = JobFairLayout;
  } else if (pathname.startsWith("/hackathon")) {
    SelectedLayout = HackathonLayout;
  } else if (pathname.startsWith("/course")){
    SelectedLayout = CourseLayout;
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        {/* Wrap the component with the selected layout */}
      <SelectedLayout>
        <Component {...pageProps} />
      </SelectedLayout>
      </AuthProvider>
      {/* LanguageProvider wraps the entire app to provide language context */}
      {/* AuthProvider wraps the entire app to provide authentication context */}
      {/* This allows you to access language and auth context in any component */}
      {/* You can also add a global footer or other components here if needed */}
      {/* <footer className="text-center p-4 bg-gray-200 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">© 2023 BEST Mostar</p>
      </footer> */}
    </LanguageProvider>
  );
}
