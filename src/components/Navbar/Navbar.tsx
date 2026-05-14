"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import IconWindmill from "../Icons/IconWindmill";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    Join: "Join us",
    Course: "Spring Course",
    JobFair: "JobFair",
    Projekti: "Projects",
    About: "About Us",
    Timovi: "Teams",
    becomeBestie: "Become BESTie",
    Board: "Board",
    Teams: "Teams",
    History: "History",
  },
  bs: {
    Join: "Pridruži nam se",
    Course: "Proljetni seminar",
    JobFair: "Sajam Poslova",
    Projekti: "Projekti",
    About: "O nama",
    Timovi: "Timovi",
    becomeBestie: "Postani BESTovac",
    Board: "Upravni odbor",
    Teams: "Timovi",
    History: "Historija",
  },
};

const Navbar = () => {
  const { language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projektiOpen, setProjektiOpen] = useState(false);
  const [oNamaOpen, setONamaOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleProjekti = () => {
    setProjektiOpen(!projektiOpen);
    setONamaOpen(false);
  };

  const toggleONama = () => {
    setONamaOpen(!oNamaOpen);
    setProjektiOpen(false);
  };

  return (
    <section className="p-2 pl-5 pr-5 flex justify-between items-center bg-main-700 shadow-md fixed w-full z-30 top-[2.1rem] left-0">
      <Link href="/" className="flex items-center gap-1 mt-[-2.1rem]">
        <span className="fill-white dark:fill-dbg-light">
          <IconWindmill width={70} />
        </span>
        <h1 className="text-2xl text-white dark:text-dt-dark font-medium tracking-wider">
          BEST Mostar
        </h1>
      </Link>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          &#9776;
        </button>
      </div>

      {/* DESKTOP MENU */}
      <ul
        className={`hidden md:flex space-x-6 text-white dark:text-dt-dark tracking-wide relative ${
          menuOpen ? "flex-col absolute bg-main-700 p-5 top-16 right-10 w-4/5" : ""
        }`}
      >
        {/* ABOUT */}
        <li
          className="hover:underline relative group"
          onMouseEnter={() => setONamaOpen(true)}
          onMouseLeave={() => setONamaOpen(false)}
        >
          <button className="cursor-pointer" onClick={toggleONama}>
            {content[language].About}
          </button>

          <div
            className={`absolute p-5 bg-main-700 z-30 top-10 translate-x-[-1rem] translate-y-[-1rem] flex flex-col gap-4 rounded-md text-sm w-[11rem] ${
              oNamaOpen ? "block" : "hidden"
            }`}
          >
            <Link href="/about/board" className="hover:underline">
              {content[language].Board}
            </Link>
            <Link href="/about/teams" className="hover:underline">
              {content[language].Timovi}
            </Link>
            <Link href="https://www.best.eu.org/index.jsp" target="_blank" className="hover:underline">
              BEST International
            </Link>
          </div>
        </li>

        {/* JOIN — now direct link */}
        <li className="hover:underline">
          <Link
            href="https://docs.google.com/forms/d/1Lq99L6OQwJ39kQnpmowt8XCQ58pTEpnkxIlgALwImj8/viewform?edit_requested=true"
            target="_blank"
          >
            {content[language].Join}
          </Link>
        </li>

        {/* HISTORY */}
        <li className="hover:underline">
          <Link href="/history">{content[language].History}</Link>
        </li>
      </ul>

      {/* MOBILE MENU */}
      <ul
        className={`md:hidden flex flex-col space-y-4 text-white tracking-wide ${
          menuOpen
            ? "absolute top-16 right-0 bg-main-700 p-5 w-full translate-y-[-1rem]"
            : "hidden"
        }`}
      >
        {/* ABOUT MOBILE */}
        <li className="hover:underline relative group">
          <button onClick={toggleONama} className="cursor-pointer">
            {content[language].About}
          </button>

          {oNamaOpen && (
            <div className="absolute p-5 bg-main-700 z-30 top-0 right-0 flex flex-col gap-4 rounded-md text-sm w-[11rem] translate-y-[-1rem]">
              <Link href="/about/board" className="hover:underline">
                {content[language].Board}
              </Link>
              <Link href="/about/teams" className="hover:underline">
                {content[language].Timovi}
              </Link>
              <Link href="https://www.best.eu.org/index.jsp" target="_blank" className="hover:underline">
                BEST International
              </Link>
            </div>
          )}
        </li>

        {/* JOIN MOBILE — direct link */}
        <li className="hover:underline">
          <Link
            href="https://docs.google.com/forms/d/1Lq99L6OQwJ39kQnpmowt8XCQ58pTEpnkxIlgALwImj8/viewform?edit_requested=true"
            target="_blank"
          >
            {content[language].Join}
          </Link>
        </li>

        {/* HISTORY MOBILE */}
        <li className="hover:underline">
          <Link href="/history">{content[language].History}</Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
