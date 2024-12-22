import Image from "next/image";
import { FC } from "react";

import logo from "@/assets/images/logo-best.png";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 p-20 flex justify-between">
      <div>
        <div>
          <Image alt="BEST Mostar logo" src={logo} width={250} height={250} />
        </div>
        <h3 className="mt-5 text-gray-200 text-sm">
          © 2023 • Made with ♥ by BEST Mostar
        </h3>
      </div>
      <div>
        <h2 className="text-xl text-gray-100 mb-3">E-mail</h2>
        <Link
          href={"mailto:mostar@best-eu.org"}
          className="text-gray-300 underline text-lg"
        >
          mostar@best-eu.org
        </Link>
      </div>
      <div>
        <h2 className="text-xl text-gray-100 mb-3">Telefon</h2>

        <h3 className="text-gray-300 underline text-lg">+387 62 111 111</h3>
      </div>
      <div>
        <h2 className="text-xl text-gray-100 mb-3">Adresa</h2>
        <h3 className="text-gray-300 underline text-lg">Adresa BB</h3>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-100 mb-3">Zaprati nas</h2>
        <Link
          href={"https://www.facebook.com/BESTMostar/"}
          className="text-gray-300 underline text-lg mb-5"
          target="_blank"
        >
          Facebook
        </Link>
        <Link
          href={"https://www.instagram.com/best.mostar/"}
          className="text-gray-300 underline text-lg mb-5"
          target="_blank"
        >
          Instagram
        </Link>
        <Link
          href={"https://ba.linkedin.com/company/best-mostar"}
          className="text-gray-300 underline text-lg mb-5"
          target="_blank"
        >
          Linkedin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
