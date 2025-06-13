"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import IconWindmill from "../Icons/IconWindmill";
import { useLanguage } from "@/context/LanguageContext";
import useAuthCheck from "@/hooks/useCheckAuth";
import { useAuth } from "@/context/AuthContext";

const content = {
  en: {
    Join: "Join us",
    Course: "Spring Course",
    JobFair: "JobFair",
    Novosti: "News",
    Projekti: "Projects",
    About: "About Us",
    Timovi: "Teams",
    Profile: "Profile",
    Me: "Me",
    LogOut: "Log Out",
    LogIn: "Log In",
    Register: "Register",
  },
  bs: {
    Join: "Pridruzi nam se",
    Course: "Proljetni seminar",
    JobFair: "Sajam Poslova",
    Novosti: "Novosti",
    Projekti: "Projekti",
    About: "O nama",
    Timovi: "Timovi",
    Profile: "Profil",
    Me: "Ja",
    LogOut: "Odjavi se",
    LogIn: "Prijavi se",
    Register: "Registruj se",
  },
};

const Navbar = () => {
  const { language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projektiOpen, setProjektiOpen] = useState(false);
  const [oNamaOpen, setONamaOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleProjekti = () => {
    setProjektiOpen(!projektiOpen);
    setONamaOpen(false);
    setJoinOpen(false);
  };

  const toggleONama = () => {
    setONamaOpen(!oNamaOpen);
    setProjektiOpen(false);
    setJoinOpen(false);
  };

  const toggleJoin = () => {
    setJoinOpen(!joinOpen);
    setProjektiOpen(false);
    setONamaOpen(false);
  };

  const handleLogout = () => {
    logout(); // Calls logout from useAuth
    router.push("/login");
  };

  return (
    <section className="p-2 pl-5 pr-5 flex justify-between items-center bg-main-700 shadow-md fixed w-full z-30 top-[2.1rem] left-0">
      <Link href="/" className="flex items-center gap-1 mt-[-2.1rem]">
        <span className="fill-white dark:fill-dbg-light">
          <IconWindmill width={70} />
        </span>
        <h1 className="text-2xl text-white dark:text-dt-dark font-medium tracking-wider">BEST Mostar</h1>
      </Link>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          &#9776;
        </button>
      </div>

      <ul
        className={`hidden md:flex space-x-6 text-white dark:text-dt-dark tracking-wide relative ${menuOpen ? "flex-col absolute bg-main-700 p-5 top-16 right-10 w-4/5" : ""}`}
      >
        <li
          className="hover:underline relative group"
          onMouseEnter={() => setONamaOpen(true)}
          onMouseLeave={() => setONamaOpen(false)}
        >
          <button className="cursor-pointer" onClick={toggleONama}>
            {content[language].About}
          </button>
          <div
            className={`absolute p-5 bg-main-700 z-30 top-10 translate-x-[-1rem] translate-y-[-1rem] flex flex-col gap-4 rounded-md text-sm w-[11rem] ${oNamaOpen ? "block" : "hidden"}`}
          >
            <Link href="/about" className="hover:underline">BEST Mostar</Link>
            <Link href="/about/teams" className="hover:underline">{content[language].Timovi}</Link>
            <Link href="https://www.best.eu.org/index.jsp" className="hover:underline">BEST International</Link>
          </div>
        </li>
{/*

        <li
        className="hover:underline relative group"
        onMouseEnter={() => setProjektiOpen(true)}
        onMouseLeave={() => setProjektiOpen(false)}
        >
          <button className="cursor-pointer" onClick={toggleProjekti}>
            {content[language].Projekti}
          </button>
          <div
            className={`absolute p-5 bg-main-700 z-30 top-10 translate-x-[-1rem] translate-y-[-1rem] flex flex-col gap-4 rounded-md text-sm w-[11rem] ${projektiOpen ? "block" : "hidden"}`}
            >
            <Link href="/course" className="hover:underline">{content[language].Course}</Link>
            <Link href="/hackathon" className="hover:underline">Hackathon</Link>
            <Link href="/jobfair" className="hover:underline">{content[language].JobFair}</Link>
          </div>
        </li>

*/}
        <li
          className="hover:underline relative group"
          onMouseEnter={() => setJoinOpen(true)}
          onMouseLeave={() => setJoinOpen(false)}
        >
          <button className="cursor-pointer" onClick={toggleJoin}>
            {isLoggedIn ? content[language].Profile : content[language].Join}
          </button>
          <div
            className={`absolute p-5 bg-main-700 z-30 top-10 translate-x-[-1rem] translate-y-[-1rem] flex flex-col gap-4 rounded-md text-sm w-[11rem] ${joinOpen ? "block" : "hidden"}`}
          >
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="hover:underline">{content[language].Me}</Link>
                <h1 onClick={handleLogout} className="hover:underline cursor-pointer">{content[language].LogOut}</h1>
                <Link href="/" className="hover:underline">Become BESTie</Link>
              </>
            ) : (
              <>
                <Link href="/register" className="hover:underline">{content[language].Register}</Link>
                <Link href="/login" className="hover:underline">{content[language].LogIn}</Link>
                <Link href="/" className="hover:underline">Become BESTie</Link>
              </>
            )}
          </div>
        </li>

        <li className="hover:underline">
          <Link href="/news">{content[language].Novosti}</Link>
        </li>
        <li className="hover:underline">
          <Link href="/blog">Blog</Link>
        </li>
      </ul>

      <ul
        className={`md:hidden flex flex-col space-y-4 text-white tracking-wide ${menuOpen ? "absolute top-16 right-0 bg-main-700 p-5 w-full translate-y-[-1rem]" : "hidden"}`}
      >
        <li className="hover:underline relative group">
          <button onClick={toggleONama} className="cursor-pointer">
            {content[language].About}
          </button>
          {oNamaOpen && (
            <div className="absolute p-5 bg-main-700 z-30 top-0 right-0 flex flex-col gap-4 rounded-md text-sm w-[11rem] translate-y-[-1rem]">
              <Link href="/about" className="hover:underline">BEST Mostar</Link>
              <Link href="/about/teams" className="hover:underline">{content[language].Timovi}</Link>
              <Link href="https://www.best.eu.org/index.jsp" className="hover:underline">BEST International</Link>
            </div>
          )}
        </li>
{/*

<li className="hover:underline relative group">
<button onClick={toggleProjekti} className="cursor-pointer">
{content[language].Projekti}
</button>
{projektiOpen && (
  <div className="absolute p-5 bg-main-700 z-30 translate-y-[-4rem] right-0 flex flex-col gap-4 rounded-md text-sm w-[11rem]">
  <Link href="/course" className="hover:underline">{content[language].Course}</Link>
  <Link href="/hackathon" className="hover:underline">Hackathon</Link>
  <Link href="/jobfair" className="hover:underline">{content[language].JobFair}</Link>
  </div>
  )}
  </li>
  */}

        <li className="hover:underline relative group">
          <button onClick={toggleJoin} className="cursor-pointer">
            {isLoggedIn ? content[language].Profile : content[language].Join}
          </button>
          {joinOpen && (
            <div className="absolute p-5 bg-main-700 z-30 top-0 right-0 flex flex-col gap-4 rounded-md text-sm w-[11rem] translate-y-[-4rem]">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="hover:underline">{content[language].Me}</Link>
                  <h1 onClick={handleLogout} className="hover:underline">{content[language].LogOut}</h1>
                  <Link href="/" className="hover:underline">Become BESTie</Link>
                </>
              ) : (
                <>
                  <Link href="/register" className="hover:underline">{content[language].Register}</Link>
                  <Link href="/login" className="hover:underline">{content[language].LogIn}</Link>
                  <Link href="/" className="hover:underline">Become BESTie</Link>
                </>
              )}
            </div>
          )}
        </li>
        <li className="hover:underline">
          <Link href="/news">{content[language].Novosti}</Link>
          </li>
        <li className="hover:underline">
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
