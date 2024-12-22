import { NextPage } from "next";
import Image from "next/image";

import team from "@/assets/images/team.jpg";
import TeamCard from "@/components/Teams/TeamCard";
import IconLaptop from "@/components/Icons/IconComputer";
import IconHandshake from "@/components/Icons/IconHandshake";
import IconFundraising from "@/components/Icons/IconFundraising";
import IconMegaphone from "@/components/Icons/IconMegaphone";
import IconDesign from "@/components/Icons/IconDesign";

const Teams: NextPage = () => {
  return (
    <section className="h-min p-[5rem_5rem]">
      <div className="w-full relative h-[40vh]">
        <Image
          src={team}
          alt="Team"
          style={{ objectFit: "cover" }}
          className="overflow-hidden"
          fill
        />
      </div>
      <div className="bg-red-200 w-max mt-5 pl-2 pr-2 pt-1 pb-1 rounded-md">
        <h5 className="text-sm text-main font-medium">TEAMS</h5>
      </div>
      <h2 className="mt-1 text-3xl font-bold text-gray-900">
        Timovi unutar BEST-a
      </h2>
      <p className="text-gray-700 mt-3 text-justify">
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
        <TeamCard
          icon={<IconLaptop width={64} />}
          text="IT Tim"
          description="Tim zadužen za informacijske tehnologije"
        />
        <TeamCard
          icon={<IconHandshake width={64} />}
          text="HR Tim"
          description="Tim zadužen za ljudske resurse"
        />
        <TeamCard
          icon={<IconFundraising width={64} />}
          text="FR Tim"
          description="Tim zadužen za odnose sa kompanijama"
        />
        <TeamCard
          icon={<IconMegaphone width={64} />}
          text="PR Tim"
          description="Tim zadužen za odnos sa javnošću"
        />
        <TeamCard
          icon={<IconDesign width={64} />}
          text="Dizajn Tim"
          description="Tim zadužen za dizajn"
        />
      </div>
    </section>
  );
};

export default Teams;
