import { FC } from "react";
import Image from "next/image";

type Member = {
  name: string;
  imageSrc: string;
};

type TeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  members: Member[];
};

const TeamModal: FC<TeamModalProps> = ({ isOpen, onClose, title, description, members }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dbg-dark text-dt-light dark:text-dt-dark p-6 rounded-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 font-bold text-xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
        <h3 className="font-semibold mb-4">Members:</h3>
        <ul className="flex flex-wrap gap-4">
          {members.map(({ name, imageSrc }, i) => (
  <li key={i} className="flex items-center space-x-3">
    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
      <Image
        src={imageSrc || "/default-profile.png"}
        alt={name}
        width={48}
        height={48}
        objectFit="cover"
        onError={(e) => {
          // If image fails to load, fallback to default
          (e.currentTarget as HTMLImageElement).src = "/default-profile.png";
        }}
      />
    </div>
    <span className="text-gray-700 dark:text-gray-300">{name}</span>
  </li>
))}
        </ul>
      </div>
    </div>
  );
};

export default TeamModal;
