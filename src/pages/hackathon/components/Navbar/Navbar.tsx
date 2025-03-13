"use client"; // Ensure this is at the top for client-side execution

import { useState } from "react";
import Link from "next/link";
import IconWindmill from "../../../../components/Icons/IconWindmill";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle navigation menu on mobile
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <section className="p-2 pl-5 pr-5 flex justify-between items-center bg-purple-900 shadow-md fixed w-full z-20 top-0 left-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <span className="fill-white">
          <IconWindmill width={50} />
        </span>
        <h1 className="text-xl text-white font-medium tracking-normal">
          BEST Mostar
        </h1>
      </Link>

      {/* Hamburger Button for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          &#9776;
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 text-white">
      <li className="hover:underline">
          <Link href="/hackathon">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/jobfair/agenda">Agenda</Link>
        </li>
        <li className="hover:underline">
          <Link href="/jobfair/partners">Partners</Link>
        </li>
        <li className="hover:underline">
          <Link href="/jobfair/history">History</Link>
        </li>
        <li className="hover:underline">
          <Link href="https://best.eu.org" target="_blank" className="text-orange-500">
            BEST International
          </Link>
        </li>
      </ul>

      {/* Mobile Navigation */}
      <ul
        className={`md:hidden flex flex-col space-y-4 text-white bg-blue-900 absolute top-16 right-0 p-5 w-full ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <li className="hover:underline">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/agenda" onClick={() => setMenuOpen(false)}>
            Agenda
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/partners" onClick={() => setMenuOpen(false)}>
            Partners
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/history" onClick={() => setMenuOpen(false)}>
            History
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="https://best.eu.org" className="text-orange-500" target="_blank" onClick={() => setMenuOpen(false)}>
            BEST International
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
