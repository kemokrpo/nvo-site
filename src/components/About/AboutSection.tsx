import Image from "next/image";
import { FC } from "react";

import bg from "@/assets/images/hackathon.jpg";

const AboutSection: FC = () => {
  return (
    <section className="bg-gray-100 p-[5rem_5rem] flex justify-between gap-10 h-[65vh]">
      <div className="w-1/2 h-full">
        <div className="bg-red-200 w-max pl-2 pr-2 pt-1 pb-1 rounded-md">
          <h5 className="text-sm text-main font-medium">ABOUT US</h5>
        </div>
        <h2 className="mt-1 text-3xl font-bold text-gray-900">
          Ukratko o nama
        </h2>
        <p className="mt-5 text-gray-700 text-justify">
          BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić” u
          Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
          postojanja izrasla je u jednu od najprepoznatljivih studentskih
          organizacija u Mostaru. Zahvaljujući zalaganju mladih i
          entuzijastičnih članova organizacije, studentima Univerziteta je
          omogućeno povezivanje, razmjena i saradnja sa studentima iz cijele
          Evrope.
        </p>
        <p className="mt-5 text-gray-700 text-justify">
          BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić” u
          Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
          postojanja izrasla je u jednu od najprepoznatljivih studentskih
          organizacija u Mostaru. Zahvaljujući zalaganju mladih i
          entuzijastičnih članova organizacije, studentima Univerziteta je
          omogućeno povezivanje, razmjena i saradnja sa studentima iz cijele
          Evrope.
        </p>
      </div>
      <div className="w-1/2 relative rounded-md overflow-hidden">
        <Image
          src={bg}
          alt="Hero background image"
          style={{ objectFit: "cover" }}
          className="overflow-hidden"
          fill
        />
      </div>
    </section>
  );
};

export default AboutSection;
