import { FC } from "react";
import TestemonialCard from "./TestimonialCard";

const Cards = [
  {
    name: "Ime prezime",
    position: "CEO at Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
  },
  {
    name: "Ime prezime",
    position: "CEO at Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
  },
  {
    name: "Ime prezime",
    position: "CEO at Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
  },
  {
    name: "Ime prezime",
    position: "CEO at Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
  },
];

const TestemonialSection: FC = () => {
  return (
    <section className="bg-gray-100 pb-20">
      <h1 className="text-center text-main-700 text-5xl font-bold pt-5 pb-10">
        Iskustva u suradnji
      </h1>

      {/* Responsive Grid */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {Cards.map((el, i) => {
          return (
            <TestemonialCard
              key={i}
              title={el.name}
              text={el.text}
              position={el.position}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TestemonialSection;
