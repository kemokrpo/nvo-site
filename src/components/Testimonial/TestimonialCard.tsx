import { FC } from "react";

type TProps = {
  title: string;
  position: string;
  text: string;
};

const TestemonialCard: FC<TProps> = ({ title, position, text }) => {
  return (
    <div className="bg-white dark:bg-dt-light mt-8 border-gray-300 border-solid border-[1px] p-5 rounded-md">
      <div className="flex items-center gap-4">
        <div className="bg-main-700 w-10 h-10 rounded-full"></div>
        <div>
          <h3 className="text-xl text-gray-900 dark:text-dt-dark">{title}</h3>
          <p className="text-sm text-gray-400 dark:text-dt-dark">{position}</p>
        </div>
      </div>
      <p className="pt-5 text-gray-700 text-sm sm:text-base dark:text-dt-dark">{text}</p>
    </div>
  );
};

export default TestemonialCard;
