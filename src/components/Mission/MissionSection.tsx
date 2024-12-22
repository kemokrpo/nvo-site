import { FC } from "react";
import IconFlexibleStar from "../Icons/IconFlexibleStar";
import IconFriends from "../Icons/IconFriends";
import IconFun from "../Icons/IconFun";
import IconImprovement from "../Icons/IconImprovement";
import IconLearning from "../Icons/IconLearning";
import MissionCircle from "./MissionCircle";

const mission = [
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
  return (
    <section className="h-[30rem] bg-main">
      <h2 className="text-5xl font-bold text-center text-white pt-10">
        BEST Spirit
      </h2>
      <div className="flex items-center p-[4rem_5rem] justify-between">
        {mission.map((el, i) => {
          return <MissionCircle key={i} icon={el.icon} title={el.title} />;
        })}
      </div>
    </section>
  );
};

export default MissionSection;
