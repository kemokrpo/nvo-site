import { FC } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Content = {
  en: {
    Osnivanje: string;
    Baby: string;
    Full: string;
  };
  bs: {
    Osnivanje: string;
    Baby: string;
    Full: string;
  };
};
const content: Content = {
  en: {
    Osnivanje: `Forming of local group BEST Mostar - 2011`,
    Baby: `Status of baby member local group - 2011`,
    Full: `Status of full member local group - 2011`,
  },
  bs: {
    Osnivanje: `Osnivanje lokalne grupe BEST Mostar - 2011`,
    Baby: `Status baby clana lokalne grupe - 2011`,
    Full: `Status punopravnog clana lokalne grupe - 2011`,
  }
};

const MilestoneBar: FC = () => {
  const { language }: { language: 'en' | 'bs' } = useLanguage();
  return (
    <section className="h-[60vh] mt-20 mb-20 flex justify-center bg-gray-100 dark:bg-dbg-dark pb-10 relative">
      <ol className="relative border-l-2 border-main-700 flex flex-col content-center">
        <li className="mb-[8rem] ml-10">
          <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-main-700 bg-gray-100 dark:bg-dbg-dark dark:text-dt-dark"></span>
          <h3 className="flex items-center mb-1 text-md  text-gray-600 dark:text-dt-dark">
            {content[language].Osnivanje}
          </h3>
        </li>
        <li className="mb-[8rem] ml-10">
          <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-main-700 bg-gray-100 dark:bg-dbg-dark dark:text-dt-dark"></span>
          <h3 className="flex items-center mb-1 text-md  text-gray-600 dark:text-dt-dark">
            {content[language].Baby}
          </h3>
        </li>
        <li className="mb-10 ml-10">
          <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-main-700 bg-gray-100 dark:bg-dbg-dark"></span>
          <h3 className="flex items-center mb-1 text-md  text-gray-600 dark:text-dt-dark ">
            {content[language].Full}
          </h3>
        </li>
      </ol>
    </section>
  );
};

export default MilestoneBar;
