"use client";

import { useState } from "react";
import events from "@/data/events.json";

const HistoryPage = () => {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const years = Array.from(
    new Set(events.map((e) => e.year))
  ).sort((a, b) => b - a);

  const filteredEvents =
    selectedYear === "all"
      ? events
      : events.filter((event) => event.year === selectedYear);

  const makeSubdomainLink = (subdomain: string) =>
    `https://${subdomain}.best-mostar.org`;

  return (
    <section className="min-h-screen p-6 pt-28 bg-main-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-dt-light dark:text-dt-dark">History</h1>

      {/* Year Filter */}
      <div className="flex justify-center mb-8">
        <select
          className="p-2 rounded bg-white dark:bg-white text-black dark:text-black border border-gray-300 border-"
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, idx) => (
          <a
            key={idx}
            href={makeSubdomainLink(event.subdomain)}
            target="_blank"
            className="bg-main-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-sm opacity-80">{event.description}</p>
              <p className="mt-2 text-right opacity-60">{event.year}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default HistoryPage;
