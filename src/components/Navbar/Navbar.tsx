"use client";

import Link from "next/link";
import IconWindmill from "../Icons/IconWindmill";

const Navbar = () => {
  return (
    <section className="p-2 pl-5 pr-5 flex justify-between items-center bg-main shadow-md fixed w-full z-20 top-0">
      <Link href="/" className="flex items-center gap-1">
        <span className="fill-white">
          <IconWindmill width={50} />
        </span>
        <h1 className="text-xl text-white font-medium tracking-wider">
          BEST Mostar
        </h1>
      </Link>

      <ul className="flex justify-between w-2/5 text-white tracking-wide">
        <li className="hover:underline relative group">
          <Link href="/about">
            <h1 className="cursor-pointer">O nama</h1>
          </Link>
          <div className="absolute p-5 bg-main z-30 top-5 right-[-6rem] hidden group-hover:flex flex-col gap-4 rounded-md text-sm w-[11rem]">
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
        </li>
        <li className="hover:underline">
          <Link href="/about/news">Novosti</Link>
        </li>
        <li className="hover:underline relative group">
          <Link href="/about">
            <h1 className="cursor-pointer">Projekti</h1>
          </Link>
          <div className="absolute p-5 bg-main z-30 top-5 right-[-6rem] hidden group-hover:flex flex-col gap-4 rounded-md text-sm w-[11rem]">
            <Link
              href="https://course25-best-mostar.org/"
              className="hover:underline"
            >
              Proljetni seminar
            </Link>
            <Link
              href="https://hackathon-bestmostar.org/"
              className="hover:underline"
            >
              Hackathon
            </Link>
            <Link href="https://jobfairmostar.org/">
              JobFair
            </Link>
          </div>
        </li>
        <li className="hover:underline">
          <Link href="/about">Pridruzi nam se</Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
