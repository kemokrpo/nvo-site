import { FC } from "react";

type TProps = {
  icon: React.ReactNode;
  text: string;
  description: string;
};

const TeamCard: FC<TProps> = ({ icon, text, description }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="fill-main-700">{icon}</span>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-dt-dark">{text}</h3>
      <p className="pt-1 text-gray-700 dark:text-dt-dark">{description}</p>
    </div>
  );
};

export default TeamCard;
