// src/components/Agenda/AgendaCard.tsx
import React from "react";

type AgendaCardProps = {
  day: string;
  content: string;
};

const AgendaCard: React.FC<AgendaCardProps> = ({ day, content }) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">{day}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{content}</p>
    </div>
  );
};

export default AgendaCard;
