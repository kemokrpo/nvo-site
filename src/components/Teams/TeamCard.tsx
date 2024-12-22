import { FC } from "react";

type TProps = {
  icon: React.ReactNode;
  text: string;
  description: string;
};

const TeamCard: FC<TProps> = ({ icon, text, description }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="fill-main">{icon}</span>
      <h3 className="text-2xl font-bold text-gray-800">{text}</h3>
      <p className="pt-1 text-gray-700">{description}</p>
    </div>
  );
};

export default TeamCard;
