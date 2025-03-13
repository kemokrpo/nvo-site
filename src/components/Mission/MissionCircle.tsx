import { FC } from "react";

type TProps = {
  icon: JSX.Element;
  title: string;
};

const MissionCircle: FC<TProps> = ({ icon, title }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 sm:gap-5">
      <div
        className="rounded-full bg-white dark:bg-dt-light flex justify-center items-center fill-main-700"
        style={{
          width: "clamp(5rem, 8vw, 9rem)", // Smaller circles for md screens
          height: "clamp(5rem, 8vw, 9rem)", // Smaller circles for md screens
        }}
      >
        {icon}
      </div>
      <h4 className="text-xl md:text-lg lg:text-2xl xl:text-3xl text-white dark:text-dt-light">{title}</h4>
    </div>
  );
};

export default MissionCircle;
