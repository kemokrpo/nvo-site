import { FC, useMemo } from "react";
import IconCake from "../Icons/IconCake";
import IconGroup from "../Icons/IconGroup";
import IconProject from "../Icons/IconProject";
import { useLanguage } from "@/context/LanguageContext";


type Content = {
  en: {
    Years:string;
    Projects:string;
    Clan:string;
  };
  bs: {
    Years:string;
    Projects:string;
    Clan:string;
  };
};
const content: Content = {
  en: {
    Years: `Years of existence`,
    Projects: `Yearly projects`,
    Clan: `Active members`,
  },
  bs: {
    Years: `Godine postojanja`,
    Projects: `Projekata godisnje`,
    Clan: `Aktivnih clanova`,
  }
};

const caculateYearsSince = (dateString: string): number => {
  const referanceDate = new Date(dateString);
  const currentDate = new Date();

  let yearsPassed = currentDate.getFullYear() - referanceDate.getFullYear();
  if (currentDate.getMonth() < referanceDate.getMonth() ||
    (currentDate.getMonth() === referanceDate.getMonth() && currentDate.getDate() < referanceDate.getDate())) {
    yearsPassed -= 1;
  }
  return yearsPassed;
};

const Projects: FC = () => {
  const { language }: { language: 'en' | 'bs' } = useLanguage();
  const years = useMemo(() => caculateYearsSince("2011-12-22"), []);
  return (
    <section className="bg-main-700 flex flex-col sm:flex-row justify-evenly p-10 gap-10 sm:gap-0">
      <div className="flex flex-col items-center gap-3">
        <span className="fill-white dark:fill-dt-dark">
          <IconCake width={100} />
        </span>
        <h4 className="text-3xl text-white font-bold dark:text-dt-dark">{years}</h4>
        <h3 className="text-xl text-white dark:text-dt-dark">{content[language].Years}</h3>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="fill-white dark:fill-dt-dark">
          <IconProject width={100} />
        </span>
        <h4 className="text-3xl text-white font-bold dark:text-dt-dark">3</h4>
        <h3 className="text-xl text-white dark:text-dt-dark">{content[language].Projects}</h3>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="fill-white dark:fill-dt-dark">
          <IconGroup width={100} />
        </span>
        <h4 className="text-3xl text-white font-bold dark:text-dt-dark">20 +</h4>
        <h3 className="text-xl text-white dark:text-dt-dark">{content[language].Clan}</h3>
      </div>
    </section>
  );
};

export default Projects;
