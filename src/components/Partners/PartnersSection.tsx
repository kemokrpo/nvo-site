import Image from "next/image";
import { FC } from "react";

import logoIpsum from "@/assets/images/logo-ipsum.svg";

const PartnersSection: FC = () => {
  return (
    <section className="pb-10 bg-gray-100 pt-20">
      <h1 className="text-center text-main text-5xl font-bold pt-5 pb-10">
        Nasi partneri
      </h1>
      <div className="w-4/5 m-auto grid grid-cols-4 gap-y-20 justify-between items-center flex-wrap p-10 gap-x-10 opacity-50">
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
