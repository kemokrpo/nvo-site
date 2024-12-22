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
      </Head>
      <main>
        <div className="h-screen relative bg-[url(/img/home-bg.jpg)] bg-cover">
          <div
            className="w-[37.5rem] h-[12.5rem] bg-main absolute bottom-0 left-0 flex items-center"
            style={{
              clipPath: "polygon(0 0, 52% 0, 100% 100%, 0% 100%)",
            }}
          >
            <Image src={bg} alt="BEST Motto" width={350} height={350} />
          </div>
        </div>
        <MissionSection />
        <AboutSection />
        <MilestoneBar />
        <TestimonialSection />
        <Projects />
        <PartnersSection />
      </main>
    </>
  );
}
