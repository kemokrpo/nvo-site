"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import IconWindmill from "../Icons/IconWindmill";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projektiOpen, setProjektiOpen] = useState(false);
  const [oNamaOpen, setONamaOpen] = useState(false);

  const router = useRouter();

  // Reset dropdowns when route changes
  useEffect(() => {
    setProjektiOpen(false);
    setONamaOpen(false);
    setMenuOpen(false);
  }, [router.asPath]); // Triggered when route changes

  // Toggle navigation menu on mobile
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle Projekti dropdown and close O nama if open
  const toggleProjekti = () => {
    setProjektiOpen(!projektiOpen);
    if (oNamaOpen) setONamaOpen(false); // Close O nama if Projekti is opened
  };

  // Toggle O nama dropdown and close Projekti if open
  const toggleONama = () => {
    setONamaOpen(!oNamaOpen);
    if (projektiOpen) setProjektiOpen(false); // Close Projekti if O nama is opened
  };

  return (
    <section className="p-2 pl-5 pr-5 flex justify-between items-center bg-main shadow-md fixed w-screen z-20 top-0">
      <Link href="/" className="flex items-center gap-1">
        <span className="fill-white">
          <IconWindmill width={50} />
        </span>
        <h1 className="text-xl text-white font-medium tracking-wider">
          BEST Mostar
        </h1>
      </Link>

      {/* Hamburger Button for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          &#9776;
        </button>
      </div>

      {/* Navigation Menu */}
      <ul
        className={`flex justify-between w-2/5 text-white tracking-wide ${
          menuOpen ? "flex-col absolute bg-main p-5 top-16 right-0" : "hidden"
        }`}
      >
        {/* O nama Dropdown */}
        <li className="hover:underline relative">
          <button onClick={toggleONama} className="cursor-pointer">
            O nama
          </button>
          {oNamaOpen && (
            <div className="absolute p-5 bg-main z-30 top-0 right-[12rem] flex flex-col gap-4 rounded-md text-sm w-[11rem]">
              <Link href="/about" className="hover:underline">
                BEST Mostar
              </Link>
              <Link href="/about/teams" className="hover:underline">
                Timovi
              </Link>
              <Link
                href="https://www.best.eu.org/index.jsp"
                className="hover:underline"
              >
                BEST International
              </Link>
            </div>
          )}
        </li>

        {/* Projekti Dropdown */}
        <li className="hover:underline relative">
          <button onClick={toggleProjekti} className="cursor-pointer">
            Projekti
          </button>
          {projektiOpen && (
            <div className="absolute p-5 bg-main z-30 top-0 right-[12rem] flex flex-col gap-4 rounded-md text-sm w-[11rem]">
              <Link
                href="https://course25-best-mostar.org/"
                className="hover:underline"
                target="_blank"
              >
                Proljetni seminar
              </Link>
              <Link
                href="https://hackathon-bestmostar.org/"
                className="hover:underline"
                target="_blank"
              >
                Hackathon
              </Link>
              <Link href="https://jobfairmostar.org/" target="_blank">
                JobFair
              </Link>
            </div>
          )}
        </li>

        {/* Novosti Link */}
        <li className="hover:underline">
          <Link href="/about/news">Novosti</Link>
        </li>

        {/* Pridruzi nam se Link */}
        <li className="hover:underline">
          <Link href="/about">Pridruzi nam se</Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
