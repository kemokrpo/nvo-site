import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import JobFairLayout from "@/pages/jobfair/components/Layout/Layout";
import HackathonLayout from "@/pages/hackathon/components/Layout/Layout";
import { LanguageProvider } from "@/context/LanguageContext";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  // Determine the layout to use based on the route
  let SelectedLayout = Layout; // Default Layout
  if (pathname.startsWith("/jobfair")) {
    SelectedLayout = JobFairLayout;
  } else if (pathname.startsWith("/hackathon")) {
    SelectedLayout = HackathonLayout;
  }

  return (
    <LanguageProvider>
      <SelectedLayout>
        <Component {...pageProps} />
      </SelectedLayout>
    </LanguageProvider>
  );
}
