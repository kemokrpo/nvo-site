import Head from "next/head";
import Image from "next/image";
import Cookies from "js-cookie";
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
      <div className="relative w-full h-[32vh] sm:h-[58vh] md:h-[64vh] xl:h-screen bg-[url(/img/home-bg.jpg)] bg-cover bg-center bg-no-repeat">
  <div
    className="w-full md:w-[37.5rem] md:h-[12.5rem] bg-main-700 absolute bottom-0 left-0 flex items-center custom-clip-path translate-y-20 md:translate-y-0"
  >
    <div className="image-container h-[150px] w-full sm:h-full">
      <Image
        src={bg}
        alt="BEST Motto"
        width={350}
        height={350}
        className="sm:translate-x-3 translate-x-4 translate-y-5 sm:translate-y-0"
      />
    </div>
  </div>
</div>

        <div className="mt-20 sm:mt-10 md:mt-0">
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
