import { FC } from "react";

type TProps = {
  icon: JSX.Element;
  title: string;
};

const MissionCircle: FC<TProps> = ({ icon, title }) => {
  return (
    <div
      className="flex justify-center items-center flex-col gap-3 sm:gap-5"
      style={{
        width: "clamp(7rem, 10vw, 12rem)", // Fixed width for the entire component
        height: "clamp(10rem, 15vw, 16rem)", // Fixed total height (circle + text)
      }}
    >
      <div
        className="rounded-full bg-white dark:bg-dt-dark flex justify-center items-center fill-main-700"
        style={{
          width: "clamp(5rem, 8vw, 9rem)", // Fixed circle size
          height: "clamp(5rem, 8vw, 9rem)", // Fixed circle size
        }}
      >
        {icon}
      </div>
      <h4
        className="text-xl md:text-lg lg:text-2xl xl:text-3xl text-white dark:text-dt-dark text-center overflow-hidden text-ellipsis"
        style={{
          maxHeight: "3rem", // Limit the height of the text
          overflow: "hidden", // Prevent text overflow
          textOverflow: "ellipsis", // Truncate text with ellipsis if needed
          whiteSpace: "nowrap", // Prevent text wrapping
        }}
      >
        {title}
      </h4>
    </div>
  );
};

export default MissionCircle;
