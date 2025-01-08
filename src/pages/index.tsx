import Head from "next/head";
import Image from "next/image";

import bg from "@/assets/images/best-motto.svg";
import AboutSection from "@/components/About/AboutSection";
import MissionSection from "@/components/Mission/MissionSection";
import MilestoneBar from "@/components/MilestoneBar/MilestoneBar";
import TestimonialSection from "@/components/Testimonial/TestimonialSection";
import Projects from "@/components/Projects/Projects";
import PartnersSection from "@/components/Partners/PartnersSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>BEST Mostar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className="relative w-full h-[32vh] sm:h-screen relative bg-[url(/img/home-bg.jpg)] bg-cover bg-center bg-no-repeat bg-left">
          <div
            className="w-full sm:w-[37.5rem] sm:h-[12.5rem] bg-main absolute bottom-0 left-0 flex items-center custom-clip-path translate-y-20 sm:translate-y-0"
          >
            <div className="relative h-[150px] w-full sm:h-full">
              <Image
                src={bg}
                alt="BEST Motto"
                width={350}
                height={350}
                className="sm:translate-x-0 translate-x-12" 
              />
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-0">
          <MissionSection />
          <AboutSection />
          <MilestoneBar />
          <TestimonialSection />
          <Projects />
          <PartnersSection />
        </div>
      </main>
    </>
  );
}
