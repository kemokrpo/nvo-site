import Image from "next/image";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

import bg from "@/assets/images/hackathon.jpg";

// Type for the content object
type Content = {
  en: {
    t1: string;
    t2: string;
  };
  bs: {
    t1: string;
    t2: string;
  };
};

const content: Content = {
  en: {
    t1: `BEST Mostar is a local BEST group of the University “Džemal Bijedić” in
        Mostar, which has more than 45 active members. In 11 years of
        existence, it has grown into one of the most recognizable student
        organizations in Mostar. Thanks to the efforts of the young and
        enthusiastic members of the organization, students of the University are
        enabled to connect, exchange and cooperate with students from all over
        Europe.`,
    t2: `BEST Mostar is a local BEST group of the University “Džemal Bijedić” in
        Mostar, which has more than 45 active members. In 11 years of
        existence, it has grown into one of the most recognizable student
        organizations in Mostar. Thanks to the efforts of the young and
        enthusiastic members of the organization, students of the University are
        enabled to connect, exchange and cooperate with students from all over
        Europe.`
  },
  bs: {
    t1: `BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić” u
          Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
          postojanja izrasla je u jednu od najprepoznatljivijih studentskih
          organizacija u Mostaru. Zahvaljujući zalaganju mladih i
          entuzijastičnih članova organizacije, studentima Univerziteta je
          omogućeno povezivanje, razmjena i saradnja sa studentima iz cijele
          Evrope.`,
    t2: `BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić” u
          Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
          postojanja izrasla je u jednu od najprepoznatljivijih studentskih
          organizacija u Mostaru. Zahvaljujući zalaganju mladih i
          entuzijastičnih članova organizacije, studentima Univerziteta je
          omogućeno povezivanje, razmjena i saradnja sa studentima iz cijele
          Evrope.`
  }
};

const AboutSection: FC = () => {
  const { language }: { language: 'en' | 'bs' } = useLanguage(); // Explicitly typed language

  return (
    <section className="bg-gray-100 dark:bg-dbg-dark px-5 py-10 sm:px-20 sm:py-[5rem] flex flex-col xl:flex-row gap-10 h-auto xl:h-[65vh]">
      {/* Left Side (Text Content) */}
      <div className="w-full xl:w-1/2 h-full">
        <div className="bg-red-200 w-max pl-2 pr-2 pt-1 pb-1 rounded-md">
          <h5 className="text-sm text-main-700 font-medium">ABOUT US</h5>
        </div>
        <h2 className="mt-1 text-2xl sm:text-3xl dark:text-dt-dark font-bold text-gray-900 md:text-blue">
          Ukratko o nama
        </h2>
        <p className="mt-5 text-gray-700 text-justify dark:text-dt-dark">
          {content[language].t1} 
        </p>
        <p className="mt-5 text-gray-700 dark:text-dt-dark text-justify">
          {content[language].t2} 
        </p>
      </div>

      {/* Right Side (Image) */}
      <div className="w-full xl:w-1/2 relative rounded-md overflow-hidden mt-5 xl:mt-0">
        <div className="h-auto">
          <Image
            src={bg}
            alt="Hero background image"
            className="w-full h-auto"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
