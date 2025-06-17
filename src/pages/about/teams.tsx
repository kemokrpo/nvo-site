import { NextPage } from "next";
import Image from "next/image";

import team from "@/assets/images/team.jpg";
import TeamCard from "@/components/Teams/TeamCard";
import IconLaptop from "@/components/Icons/IconComputer";
import IconHandshake from "@/components/Icons/IconHandshake";
import IconFundraising from "@/components/Icons/IconFundraising";
import IconMegaphone from "@/components/Icons/IconMegaphone";
import IconDesign from "@/components/Icons/IconDesign";
import { useLanguage } from "@/context/LanguageContext";
import TeamModal from "@/components/Teams/TeamModal"; 
import { useState } from "react";


const teamMembers = {
  IT: [
    { name: "Kemo Krpo", imageSrc: "/members/it/kemokrpo.jpg" },
    { name: "Vedad Keskin", imageSrc: "/members/it/vedadkeskin.png" },
    { name: "Nudžejma Lopo", imageSrc: "/members/it/nudzejmalopo.png" }
  ],
  HR: [
    { name: "Kemo Krpo", imageSrc: "/members/it/kemokrpo.jpg" }
  ],
  FR: [
    { name: "Adla Blagajac", imageSrc: "/default-profile.png" },
    { name: "Kemo Krpo", imageSrc: "/members/it/kemokrpo.jpg" },
  ],
  PR: [
    { name: "Kemo Krpo", imageSrc: "/members/it/kemokrpo.jpg" }
  ],
  DT: [
    { name: "Kemo Krpo", imageSrc: "/members/it/kemokrpo.jpg" },
  ],
};
type Content = {
  en: {
    Teams:string;
    BestTeams:string;
    IT:string;
    HR:string;
    FR:string;
    PR:string;
    DT:string;
    ITD:string;
    HRD:string;
    FRD:string;
    PRD:string;
    DTD:string;
  };
  bs: {
    Teams:string;
    BestTeams:string;
    IT:string;
    HR:string;
    FR:string;
    PR:string;
    DT:string;
    ITD:string;
    HRD:string;
    FRD:string;
    PRD:string;
    DTD:string;

  };
};
const content: Content = {
  en: {
    Teams:`Teams`,
    BestTeams:`Teams in BEST`,
    IT:`IT Team`,
    HR:`HR Team`,
    FR:`FR Team`,
    PR:`PR Team`,
    DT:`Design Team`,
    ITD:`Team responsible for information technologies`,
    HRD:`Team responsible for human resources`,
    FRD:`Team responsible for fundraising`,
    PRD:`Team responsible for public relationships`,
    DTD:`Team responsible for design`,
  },
  bs: {
    Teams:`Timovi`,
    BestTeams:`Timovi unutar BEST-a`,
    IT:`IT Tim`,
    HR:`HR Tim`,
    FR:`FR Tim`,
    PR:`PR Tim`,
    DT:`Dizajn Tim`,
    ITD:`Tim zadužen za informacijske tehnologije`,
    HRD:`Tim zadužen za ljudske resurse`,
    FRD:`Tim zadužen za odnose sa kompanijama`,
    PRD:`Tim zadužen za odnos sa javnošću`,
    DTD:`Tim zadužen za dizajn`,
  }
};

const Teams: NextPage = () => {
  const { language }: { language: 'en' | 'bs' } = useLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<keyof typeof teamMembers | null>(null);

  const openModal = (teamKey: keyof typeof teamMembers) => {
    setSelectedTeam(teamKey);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTeam(null);
  };
  return (
    <section className="h-min p-[5rem_5rem]">
      <div className="w-full relative h-[20vh] sm:h-[40vh]">
        <Image
          src={team}
          alt="Team"
          style={{ objectFit: "cover" }}
          className="overflow-hidden"
          fill
        />
      </div>
      <div className="bg-red-200 w-max mt-5 pl-2 pr-2 pt-1 pb-1 rounded-md">
        <h5 className="text-sm text-main font-medium">{content[language].Teams}</h5>
      </div>
      <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-dt-dark">
        {content[language].BestTeams}
      </h2>
      <p className="text-gray-700 dark:text-dt-dark mt-3 text-justify">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
        pariatur, facere maiores unde error rerum dolorum dolorem enim eius
        fugiat porro odit, earum a. Beatae perferendis, possimus asperiores at
        est debitis. Est, nulla animi minus adipisci quis fugiat aspernatur
        perferendis magnam autem aperiam rerum officiis laboriosam ut illo, rem
        similique deleniti quod dicta deserunt, error porro dolore quisquam ab
        blanditiis. Velit nulla repellat ullam quis recusandae. Quos mollitia
        aliquam nesciunt accusantium minima beatae atque vitae, harum, rem at,
        ad commodi animi maxime voluptate consequatur! Praesentium reiciendis,
        ad, nostrum dignissimos error odio harum ex sit fugiat, possimus
        voluptatibus sed nobis? Ipsa?
      </p>

      <div className="flex justify-center flex-wrap gap-10 pt-20">
        <div>
          <TeamCard
            icon={
              <span onClick={() => openModal("IT")} 
               className="cursor-pointer">
                <IconLaptop width={64} />

              </span>
              }
            text={content[language].IT}
            description={content[language].ITD}
          />
        </div>
        <div>
          <TeamCard
            icon={
            <span onClick={() => openModal("HR")}
              className="cursor-pointer">

            <IconHandshake width={64} />
            </span>
            }
            text={content[language].HR}
            description={content[language].HRD}
          />
        </div>
        <div>
          <TeamCard
            icon={
            <span onClick={() => openModal("FR")}
              className="cursor-pointer">
            <IconFundraising width={64} />
            </span>}
            text={content[language].FR}
            description={content[language].FRD}
          />
        </div>
        <div>
          <TeamCard
            icon={
            <span onClick={() => openModal("PR")}
              className="cursor-pointer">
            <IconMegaphone width={64} />
            </span>}
            text={content[language].PR}
            description={content[language].PRD}
          />
        </div>
        <div>
          <TeamCard
            icon={
            <span onClick={() => openModal("DT")}
              className="cursor-pointer">
            <IconDesign width={64} />
            </span>}
            text={content[language].DT}
            description={content[language].DTD}
          />
        </div>
      </div>

      {/* Modal */}
      {selectedTeam && (
        <TeamModal
          isOpen={modalOpen}
          onClose={closeModal}
          title={content[language][selectedTeam]}
          description={content[language][selectedTeam + "D" as keyof typeof content['en']]}
          members={teamMembers[selectedTeam]}
        />
      )}
    </section>
  );
};

export default Teams;
