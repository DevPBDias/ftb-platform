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
      className={`${className} flex flex-col items-start justify-start gap-4 w-full p-4 bg-white 2xl:px-48 mb-16`}
    >
      <header className="flex flex-col lg:flex-row items-start gap-4 lg:items-center justify-start lg:justify-between w-full">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link
          href={`/${type}s`}
          className="lg:flex items-center gap-2 bg-yellow-500 rounded-lg py-3 hidden w-36 justify-center hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        >
          <PlusCircle size={18} color="#010030" />
          <p className="font-bold text-lg">{btnName}</p>
        </Link>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-20 w-full">
        {cardsData.map(
          (card) => card.type === type && <InfoCard key={card.id} data={card} />
        )}
      </section>
      <Link
        href={`/${type}s`}
        className="flex items-center mt-4 gap-2 bg-yellow-500 rounded-lg py-3 w-full lg:hidden justify-center hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
      >
        <PlusCircle size={18} color="#010030" />
        <p className="font-bold text-lg">{btnName}</p>
      </Link>
    </section>
  );
};

export default ContainerNewsEvents;
