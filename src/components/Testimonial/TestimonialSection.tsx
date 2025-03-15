import { FC } from "react";
import TestemonialCard from "./TestimonialCard";
import { useLanguage } from "@/context/LanguageContext";

type Content = {
  en: {
    Iskustva: string;
    Cards: {
      name: string;
      position: string;
      text: string;
    }[];
  };
  bs: {
    Iskustva: string;
    Cards: {
      name: string;
      position: string;
      text: string;
    }[];
  };
};

const content: Content = {
  en: {
    Iskustva: "Experiences",
    Cards: [
      {
        name: "John Doe",
        position: "CEO at Lorem Ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
      {
        name: "Jane Smith",
        position: "CTO at Dolor Sit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
      {
        name: "Michael Johnson",
        position: "Manager at Amet Consectetur",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
      {
        name: "Emily Davis",
        position: "Designer at Adipisicing Elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
    ],
  },
  bs: {
    Iskustva: "Iskustva",
    Cards: [
      {
        name: "Ivan Ivanković",
        position: "Direktor u Lorem Ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
      {
        name: "Ana Anić",
        position: "Tehnički direktor u Dolor Sit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
      {
        name: "Marko Marković",
        position: "Menadžer u Amet Consectetur",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
      {
        name: "Ema Emanović",
        position: "Dizajner u Adipisicing Elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste enim sed facere laboriosam voluptates ducimus eveniet aut quod dolorum?",
      },
    ],
  },
};

const TestemonialSection: FC = () => {
  const { language }: { language: "en" | "bs" } = useLanguage();
  return (
    <section className="bg-gray-100 dark:bg-dbg-dark pb-20">
      <h1 className="text-center text-main-700 text-5xl font-bold pt-5 pb-10">
        {content[language].Iskustva}
      </h1>

      {/* Responsive Grid */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {content[language].Cards.map((el, i) => (
          <TestemonialCard
            key={i}
            title={el.name}
            position={el.position}
            text={el.text}
          />
        ))}
      </div>
    </section>
  );
};

export default TestemonialSection;
