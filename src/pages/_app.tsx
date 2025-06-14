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
       
      <SelectedLayout>
        <Component {...pageProps} />
      </SelectedLayout>
      </AuthProvider>
      
    </LanguageProvider>
  );
}
