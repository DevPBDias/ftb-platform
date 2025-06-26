import { cardsData } from "@/constants/news-events";
import { PlusCircle } from "lucide-react";
import React from "react";
import InfoCard from "../Card/InfoCard";
import Link from "next/link";

interface ContainerNewsEventsProps {
  title: string;
  btnName: string;
  type: "noticia" | "evento";
  className?: string;
}

const ContainerNewsEvents = ({
  title,
  btnName,
  type,
  className,
}: ContainerNewsEventsProps) => {
  return (
    <section
      className={`${className} flex flex-col items-start justify-start gap-4 w-full p-4 bg-white px-48 mb-16`}
    >
      <header className="flex flex-row items-center justify-between w-full">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link
          href={`/${type}s`}
          className="flex items-center gap-2 bg-yellow-500 rounded-lg py-2 w-36 justify-center hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        >
          <PlusCircle size={16} color="#010030" />
          <p className="font-bold text-base">{btnName}</p>
        </Link>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 w-full">
        {cardsData.map(
          (card) => card.type === type && <InfoCard key={card.id} data={card} />
        )}
      </section>
    </section>
  );
};

export default ContainerNewsEvents;
