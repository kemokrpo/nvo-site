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
        name: "Ajdin Omerović",
        position: "Participant at Hackathon 2024",
        text: "The Hackathon was an extraordinary experience for me and my professional development. Through collaboration with talented colleagues and working on projects, I gained new knowledge and numerous experiences. The organizers made sure to provide us with everything we needed to perform the task at the highest possible level.",
      },
      {
        name: "Aida Zametica",
        position: "Participant at Hackathon 2024",
        text: "Last year's Hackathon was definitely an unforgettable experience. During those three days, teamwork and camaraderie made coding not only productive but also incredibly fun. The theme was interesting and close to our interests, which further motivated us to give our best. I would recommend this type of experience to anyone who wants to step out of their comfort zone and develop new skills in a dynamic environment.",
      },
      {
        name: "Adi Tokmo",
        position: "Participant at Hackathon 2024",
        text: "Thank you for the opportunity to participate in the Hackathon. The organization was excellent, and I especially liked that we had the chance to work with mentors and receive useful advice. I hope to see you again this year.",
      },
      {
        name: "Tarik Kahrić",
        position: "Mentor at Hackathon 2024",
        text: "Participating in Hackathon 2024 was extremely interesting, especially since I was a participant a few years ago. The mentoring role allowed me to share my knowledge but also learn from the competitors, which further enriched my professional experience. I was impressed by their creativity and dedication. I saw many solutions that have the potential to become good software products. Of course, it is important to praise the excellent organization of the Hackathon team, who are key to the success of the event. I am sure that this year's Hackathon will be equally successful, if not better.",
      },
    ],
  },
  bs: {
    Iskustva: "Iskustva",
    Cards: [
      {
        name: "Ajdin Omerović",
        position: "Učesnik na Hackathonu 2024",
        text: "Hackathon je bio izvanredno iskustvo za mene i moj profesionalni razvoj. Kroz saradnju sa talentiranim kolegama i rad na projektima stekao sam nova znanja i brojna iskustva. Organizatori su se potrudili da nam omoguće sve što nam je potrebno kako bi izvrišili zadatak na najvišem mogućem nivou.",
      },
      {
        name: "Aida Zametica",
        position: "Učesnica na Hackathonu 2024",
        text: "Prošlogodišnji Hackathon je sigurno bio nezaboravno iskustvo. Tokom ta tri dana, rad u timu i zajedništvo učinili su kodiranje ne samo produktivnim već i nevjerovatno zabavnim. Tema je bila zanimljiva i bliska našim interesima, što nas je dodatno motivisalo da damo svoj maksimum. Preporučila bih ovu vrstu iskustva svakome ko želi izaći iz svoje zone komforta i razviti nove vještine u dinamičnom okruženju.",
      },
      {
        name: "Adi Tokmo",
        position: "Učesnik na Hackathonu 2024",
        text: "Hvala na prilici da učestvujemo na Hackathonu. Organizacija je bila odlična, a posebno mi se svidjelo što smo imali priliku raditi sa mentorima i dobiti korisne savjete. Nadam se da se vidimo i ove godine.",
      },
      {
        name: "Tarik Kahrić",
        position: "Mentor na Hackathonu 2024",
        text: "Sudjelovanje na Hackathonu 2024. bilo je izuzetno zanimlivo, pogotovo jer sam prije par godina bio učesnik. Mentorska uloga pružila mi je priliku da podjelim svoje znanje, ali i učim od natecatelja, pto je dodatno obogatilo moje profesionalno iskustvo. Oduševila me njihova kreativnost i posvećenost. Vidio sam mnogo riješenja koja imaju potencijala da postanu dobar softverski proizvod. Naravno važno je pohvaliti i izvanrednu organizaciju tima Hackathona, koji su ključni za uspjeh događaja. Siguran sam da će ovogodišnji Hackathon biti jednako uspješan, ako ne i bolji.",
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
