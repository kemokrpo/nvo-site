import { NextPage } from "next";
import Image from "next/image";

const boardMembers = [
  { name: "Medina Raljević", title: "President", imageSrc: "/members/board/president.png" },
  { name: "Armin Hadrović", title: "Treasurer", imageSrc: "/members/board/treasurer.png" },
  { name: "Tarik Štrkljević", title: "Secretary", imageSrc: "/members/board/secretary.png" },
  { name: "Aida Fetić", title: "Vice President for Human Resources", imageSrc: "/members/board/hr.png" },
  { name: "Kemo Krpo", title: "Vice President for Information Technologies", imageSrc: "/members/board/it.png" },
];

const managementMembers = [
  { name: "Tarik Ganić", title: "Project Coordinator", imageSrc: "/members/board/pc.png" },
  { name: "Mejrem Halilović", title: "Angels Coordinator", imageSrc: "/members/board/ac.png" },
  { name: "Enis Džemidžić", title: "Knowledge Management Coordinator", imageSrc: "/members/board/km.png" },
];

const MembersPage: NextPage = () => {
  const renderMembers = (members: typeof boardMembers, title: string) => (
    <section className="mb-10 ">
      <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
      <div className="flex flex-wrap gap-6 justify-center text-dt-light dark:text-dt-dark">
        {members.map((member, index) => (
          <div
            key={index}
            className="w-60 bg-gray-300 dark:bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow text-center flex flex-col items-center"
          >
            <Image
              src={member.imageSrc}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full"
            />
            <div className="mt-3">
              <h4 className="font-semibold break-words">{member.name}</h4>
              <p className="text-sm text-gray-600 break-words">{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section className="p-8 text-main-700">
      <h1 className="text-3xl font-bold mb-6">Meet the Team</h1>
      {renderMembers(boardMembers, "Board")}
      {renderMembers(managementMembers, "Management")}
    </section>
  );
};

export default MembersPage;
