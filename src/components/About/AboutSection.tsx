import Image from "next/image";
import { FC } from "react";

import bg from "@/assets/images/hackathon.jpg";

const AboutSection: FC = () => {
  return (
    <section className="bg-gray-100 px-5 py-10 sm:px-20 sm:py-[5rem] flex flex-col sm:flex-row gap-10 h-auto sm:h-[65vh]">
      {/* Left Side (Text Content) */}
      <div className="w-full sm:w-1/2 h-full">
        <div className="bg-red-200 w-max pl-2 pr-2 pt-1 pb-1 rounded-md">
          <h5 className="text-sm text-main-700 font-medium">ABOUT US</h5>
        </div>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 md:text-blue">
          Ukratko o nama
        </h2>
        <p className="mt-5 text-gray-700 text-justify">
          BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić” u
          Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
          postojanja izrasla je u jednu od najprepoznatljivijih studentskih
          organizacija u Mostaru. Zahvaljujući zalaganju mladih i
          entuzijastičnih članova organizacije, studentima Univerziteta je
          omogućeno povezivanje, razmjena i saradnja sa studentima iz cijele
          Evrope.
        </p>
        <p className="mt-5 text-gray-700 text-justify">
          BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić” u
          Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
          postojanja izrasla je u jednu od najprepoznatljivijih studentskih
          organizacija u Mostaru. Zahvaljujući zalaganju mladih i
          entuzijastičnih članova organizacije, studentima Univerziteta je
          omogućeno povezivanje, razmjena i saradnja sa studentima iz cijele
          Evrope.
        </p>
      </div>

      {/* Right Side (Image) */}
      <div className="w-full sm:w-1/2 relative rounded-md overflow-hidden mt-5 sm:mt-0">
        {/* Wrap Image with a container to control its responsiveness */}
        
          <Image
            src={bg}
            alt="Hero background image"
              // Add width and height here for better responsiveness
            
            style={{ objectFit: "cover" }}
          />
        
      </div>
    </section>
  );
};

export default AboutSection;
