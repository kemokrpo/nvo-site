import { NextPage } from "next";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <section className="h-[60vh] flex justify-center items-center flex-col">
      <h1 className="text-gray-800 text-3xl font-bold mb-5">
        404 | Stranica nije pronadjena.
      </h1>
      <Link href="/" className="hover:underline text-gray-800 text-xl">
        Pocetna stranica
      </Link>
    </section>
  );
};

export default Custom404;
