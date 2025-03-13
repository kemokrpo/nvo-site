import { FC } from "react";

const MilestoneBar: FC = () => {
  return (
    <section className="h-[60vh] mt-20 mb-20 flex justify-center bg-gray-100 dark:bg-dbg-dark pb-10 relative">
      <ol className="relative border-l-2 border-main-700 flex flex-col content-center">
        <li className="mb-[8rem] ml-10">
          <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-main-700 bg-gray-100"></span>
          <h3 className="flex items-center mb-1 text-md  text-gray-600 ">
            Osnivanje lokalne grupe BEST Mostar - 2011
          </h3>
        </li>
        <li className="mb-[8rem] ml-10">
          <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-main-700 bg-gray-100"></span>
          <h3 className="flex items-center mb-1 text-md  text-gray-600 ">
            Status baby clana lokalne grupe - 2011
          </h3>
        </li>
        <li className="mb-10 ml-10">
          <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-main-700 bg-gray-100"></span>
          <h3 className="flex items-center mb-1 text-md  text-gray-600 ">
            Status punopravnog clana lokalne grupe - 2011
          </h3>
        </li>
      </ol>
    </section>
  );
};

export default MilestoneBar;
