import Image from "next/image";
import { FC } from "react";

import logo from "@/assets/images/logo-best.png";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";



type Content = {
  en: {
    MadeWith: string;
    By: string;
    Mob:string;
    Adresa: string;
    Follow: string;
  };
  bs: {
    MadeWith: string;
    By: string;
    Mob:string;
    Adresa: string;
    Follow: string;
  };
};
const content: Content = {
  en: {
    MadeWith: 'Made with',
    By: `by`,
    Mob:`Telefon`,
    Adresa: `Adresa`,
    Follow: `Follow us`,
  },
  bs: {
    MadeWith: `Napravljeno sa`,
    By: `od`,
    Mob: `Telephone`,
    Adresa: `Adress`,
    Follow: `Zapratite nas,`
  }
};

const Footer: FC = () => {
  const { language }: { language: 'en' | 'bs' } = useLanguage();
  return (
    <footer className="bg-gray-900 p-10 lg:p-20 grid gap-10 lg:gap-20 grid-cols-1 lg:grid-cols-5 w-full">
      <div className="flex flex-col items-start">
        <Image alt="BEST Mostar logo" src={logo} width={250} height={250} />
        <h3 className="mt-5 text-gray-200 text-sm whitespace-normal break-words">
          © 2025 • {content[language].MadeWith} ♥ {content[language].By} BEST Mostar
        </h3>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-100 mb-3">E-mail</h2>
        <Link
          href={"mailto:mostar@best-eu.org"}
          className="text-gray-300 underline text-lg break-words"
        >
          mostar@best-eu.org
        </Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-100 mb-3">{content[language].Mob}</h2>
        <h3 className="text-gray-300 underline text-lg break-words">
          +387 62 556 586
        </h3>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-100 mb-3">{content[language].Adresa}</h2>
        <h3 className="text-gray-300 underline text-lg whitespace-normal break-words">
          USRC Midhat Hujdur Hujka, Sjeverni logor bb, Mostar, 88000 Bosna i Herzegovina
        </h3>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-100 mb-3">{content[language].Adresa}</h2>
        <Link
          href={"https://www.facebook.com/BESTMostar/"}
          className="text-gray-300 underline text-lg mb-5 break-words"
          target="_blank"
        >
          Facebook
        </Link>
        <Link
          href={"https://www.instagram.com/best.mostar/"}
          className="text-gray-300 underline text-lg mb-5 break-words"
          target="_blank"
        >
          Instagram
        </Link>
        <Link
          href={"https://ba.linkedin.com/company/best-mostar"}
          className="text-gray-300 underline text-lg mb-5 break-words"
          target="_blank"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
