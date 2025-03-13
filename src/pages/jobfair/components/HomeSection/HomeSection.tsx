// components/HomeSection.tsx
import React from "react";
import CountdownTimer from "@/components/CountdownTimers/JobFairCountdown";

const HomeSection: React.FC = () => {
  return (
    <section
      className="w-full h-screen flex justify-center items-center text-center text-white bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('/pozadina3.png')",
      }}
    >
      <div className="flex flex-col justify-center items-center px-4 w-full">
        <h5 className="text-[1rem] md:text-[2.6rem] font-medium tracking-[0.2rem] md:tracking-[1.5rem] text-white uppercase mb-4 w-full max-w-[800px]">
          BEST PRESENTS
        </h5>

        <h1 className="text-[2rem] md:text-[80px] font-bold text-white mb-[15px] md:mb-[25px] leading-[1.2] md:leading-[1.4] w-full max-w-[1800px]">
          Jobfair & Business Academy
        </h1>
        <p className="text-[1rem] md:text-[1.5rem] text-white w-full max-w-[430px] leading-[1.6] md:leading-[1.8] mb-[20px]">
          Where Ambitions Meet Opportunities
        </p>
        <div className="mt-6">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
