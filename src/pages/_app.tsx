import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import { LanguageProvider } from "@/context/LanguageContext";

import Head from "next/head";



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
 

  // Layout selection
  let SelectedLayout = Layout;

  return (
    <>
    <Head>
      <title>BEST Mostar</title>
      <meta name="description" content="Official website of BEST Mostar – student association promoting technology and innovation in Mostar, Bosnia and Herzegovina." />
  <meta name="keywords" content="BEST Mostar, technology student association, Bosnia, innovation, software engineering" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.best-mostar.org" />
  <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BEST Mostar",
              "url": "https://best-mostar.org",
              "logo": "https://best-mostar.org/logo.png",
              "sameAs": [
                "https://www.facebook.com/BESTMostar/",
                "https://www.instagram.com/best.mostar/",
                "https://www.linkedin.com/company/best-mostar/",
              ]
            }),
          }}
        />
    </Head>
   
      <LanguageProvider>
        <SelectedLayout>
           <Component {...pageProps} />
        </SelectedLayout>
      </LanguageProvider>
    
    </>
  );
}
