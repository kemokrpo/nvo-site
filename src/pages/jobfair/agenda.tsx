import React from "react";
import Card from "./components/Cards/AgendaCards";

const Agenda: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-gray-100 min-h-screen" id="services">
      {/* Heading Section */}
      <div className="text-center mb-16">
        <span className="text-sm uppercase tracking-widest text-blue-600">
          7-9 April 2025
        </span>
        <h2 className="text-4xl font-semibold text-blue-800 mt-4">
          JOBFAIR AGENDA
        </h2>
      </div>

      {/* Agenda Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-12">
        <Card day="Day One" content="TBA"/>
        <Card day="Day Two" content="TBA"/>
        <Card day="Day Three" content="TBA"/>
      </div>
    </section>
  );
};

export default Agenda;
