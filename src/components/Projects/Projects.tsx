import { FC, useMemo } from "react";
import IconCake from "../Icons/IconCake";
import IconGroup from "../Icons/IconGroup";
import IconProject from "../Icons/IconProject";

const caculateYearsSince = (dateString: string): number => {
  const referanceDate = new Date(dateString);
  const currentDate = new Date();

  let yearsPassed = currentDate.getFullYear() - referanceDate.getFullYear();
  if (currentDate.getMonth() < referanceDate.getMonth() ||
    (currentDate.getMonth() === referanceDate.getMonth() && currentDate.getDate() < referanceDate.getDate())) {
    yearsPassed -= 1;
  }
  return yearsPassed;
};

const Projects: FC = () => {
  const years = useMemo(() => caculateYearsSince("2011-12-22"), []);
  return (
    <section className="bg-main-700 flex flex-col sm:flex-row justify-evenly p-10 gap-10 sm:gap-0">
      <div className="flex flex-col items-center gap-3">
        <span className="fill-white">
          <IconCake width={100} />
        </span>
        <h4 className="text-3xl text-white font-bold">{years}</h4>
        <h3 className="text-xl text-white">Godine postojanja</h3>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="fill-white">
          <IconProject width={100} />
        </span>
        <h4 className="text-3xl text-white font-bold">3</h4>
        <h3 className="text-xl text-white">Projekata godisnje</h3>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="fill-white">
          <IconGroup width={100} />
        </span>
        <h4 className="text-3xl text-white font-bold">20 +</h4>
        <h3 className="text-xl text-white">Aktivnih clanova</h3>
      </div>
    </section>
  );
};

export default Projects;
