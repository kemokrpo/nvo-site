import { FC } from "react";
import IconFlexibleStar from "../Icons/IconFlexibleStar";
import IconFriends from "../Icons/IconFriends";
import IconFun from "../Icons/IconFun";
import IconImprovement from "../Icons/IconImprovement";
import IconLearning from "../Icons/IconLearning";
import MissionCircle from "./MissionCircle";
import { useLanguage } from "@/context/LanguageContext";

type LanguageKeys = "Fleksibilnost" | "Prijateljstvo" | "Zabava" | "Napredak" | "Pristupačnost";

type Content = {
  en: Record<LanguageKeys, string>;
  bs: Record<LanguageKeys, string>;
};

const content: Content = {
  en: {
    Fleksibilnost: "Flexibility",
    Prijateljstvo: "Friendship",
    Zabava: "Fun",
    Napredak: "Improvement",
    Pristupačnost: "Open Mindedness",
  },
  bs: {
    Fleksibilnost: "Fleksibilnost",
    Prijateljstvo: "Prijateljstvo",
    Zabava: "Zabava",
    Napredak: "Napredak",
    Pristupačnost: "Pristupačnost",
  },
};

const mission: { icon: JSX.Element; title: LanguageKeys }[] = [
  {
    icon: <IconFlexibleStar width={60} />,
    title: "Fleksibilnost",
  },
  {
    icon: <IconFriends width={60} />,
    title: "Prijateljstvo",
  },
  {
    icon: <IconFun width={60} />,
    title: "Zabava",
  },
  {
    icon: <IconImprovement width={60} />,
    title: "Napredak",
  },
  {
    icon: <IconLearning width={60} />,
    title: "Pristupačnost",
  },
];

const MissionSection: FC = () => {
  const { language }: { language: "en" | "bs" } = useLanguage();

  return (
    <section className="bg-main-700 pt-10 pb-10 sm:h-auto h-auto">
      <h2 className="text-3xl sm:text-5xl font-bold text-center text-white dark:text-dt-dark sm:translate-x-[-0rem]">
        BEST Spirit
      </h2>
      <div className="flex flex-col md:flex-row items-center sm:p-[4rem_5rem] p-4 justify-between sm:gap-12 gap-12">
        {mission.map((el, i) => (
          <MissionCircle key={i} icon={el.icon} title={content[language][el.title]} />
        ))}
      </div>
    </section>
  );
};

export default MissionSection;
