import Image from "next/image";
import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

import logoIpsum from "@/assets/images/logo-ipsum.svg";


type Content = {
  en: {
    Partners:string;
  };
  bs: {
    Partners:string;
  };
};
const content: Content = {
  en: {
    Partners:`Our partners`
  },
  bs: {
    Partners:`Nasi partneri`
  }
};

const PartnersSection: FC = () => {
  const { language }: { language: 'en' | 'bs' } = useLanguage();
  return (
    <section className="pb-10 bg-gray-100 dark:bg-dbg-dark pt-20">
      <h1 className="text-center text-main-700 text-5xl font-bold pt-5 pb-10">
        {content[language].Partners}
      </h1>
      <div className="w-4/5 m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 sm:gap-x-10 p-10 opacity-50 justify-items-center items-center">
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
        <Image
          alt="logo-ipsum"
          src={logoIpsum}
          width={150}
          height={150}
          className="fill-gray-400"
        />
      </div>
    </section>
  );
};

export default PartnersSection;
