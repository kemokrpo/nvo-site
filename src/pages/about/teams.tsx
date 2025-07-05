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
    { name: "Kemo Krpo", imageSrc: "/members/it/kemokrpo.jpg" },
    { name: "Feras Karašin", imageSrc: "/default-profile.png" }
  ],
  DT: [
    { name: "Kemo Krpo", imageSrc: "/members/it/kemokrpo.jpg" },
  ],
};
type Content = {
  en: {
    Teams:string;
    BestTeams:string;
    TeamsInBEST:string;
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
    TeamsInBEST:string;
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
    TeamsInBEST:`Teams within BEST Mostar include the following: Information Technologies Team, Human Resources Team, Fundraising Team, Public Relations Team, and Design Team.`,
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
    TeamsInBEST:`Timovi unutar BEST-a Mostar uključuju sljedeće: Tim za informacijske tehnologije, Tim za ljudske resurse, Tim za prikupljanje sredstava, Tim za odnose s javnošću i Tim za dizajn.`,
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
        {content[language].TeamsInBEST}
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
