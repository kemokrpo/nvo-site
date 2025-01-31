import { FC } from "react";

type TProps = {
  icon: JSX.Element;
  title: string;
};

const MissionCircle: FC<TProps> = ({ icon, title }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 sm:gap-5">
      <div className="w-[10rem] h-[10rem] rounded-full bg-white flex justify-center items-center fill-main-700">
        {icon}
      </div>
      <h4 className="text-xl sm:text-3xl text-white">{title}</h4>
    </div>
  );
};

export default MissionCircle;
