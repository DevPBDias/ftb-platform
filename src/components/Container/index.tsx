"use client";

import { PlusCircle } from "lucide-react";
import InfoCard from "../Card/InfoCard";
import Link from "next/link";
import LoadingThreeDotsJumping from "@/app/loading";
import { useFetch } from "@/hooks/useFetch";
import { CardData, ContainerNewsEventsProps } from "@/types/cards.types";

const ContainerNewsEvents = ({
  title,
  btnName,
  type,
  className,
  turnOffTitle,
  turnOffBtn,
}: ContainerNewsEventsProps) => {
  const { data: cards, loading, error } = useFetch<CardData[]>(`/api/${type}`);

  if (loading) return <LoadingThreeDotsJumping />;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!cards || cards.length === 0)
    return <p className="text-white">Nenhum clube encontrado.</p>;

  return (
    <section
      className={`${className} flex flex-col items-start justify-start gap-4 w-full p-4 2xl:px-[10%] mb-16`}
    >
      <header className="flex flex-col lg:flex-row items-start gap-4 lg:items-center justify-start lg:justify-between w-full">
        {!turnOffTitle && <h2 className="text-3xl font-bold">{title}</h2>}
        {!turnOffBtn && (
          <Link
            href={`/${type}`}
            className="lg:flex items-center gap-2 bg-yellow-500 rounded-lg py-3 hidden w-36 justify-center hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
          >
            <PlusCircle size={18} color="#010030" />
            <p className="font-bold text-lg">{btnName}</p>
          </Link>
        )}
      </header>

      {loading ? (
        <LoadingThreeDotsJumping />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-20 w-full">
          {cards.map((card, index) => (
            <InfoCard key={card.id || index} data={card} type={type} />
          ))}
        </section>
      )}
      {cards.length === 0 && !loading && (
        <p className="text-gray-500 italic">Nenhum {type} encontrado.</p>
      )}
      {!turnOffBtn && (
        <Link
          href={`/${type}`}
          className="flex items-center mt-4 gap-2 bg-yellow-500 rounded-lg py-3 w-full lg:hidden justify-center hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        >
          <PlusCircle size={18} color="#010030" />
          <p className="font-bold text-lg">{btnName}</p>
        </Link>
      )}
      {turnOffBtn && (
        <Link
          href={`/`}
          className="flex items-center mt-4 gap-2 bg-yellow-500 rounded-lg py-3 w-full lg:hidden justify-center hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        >
          <p className="font-bold text-lg">Voltar</p>
        </Link>
      )}
    </section>
  );
};

export default ContainerNewsEvents;
