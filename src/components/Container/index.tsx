"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import type { CardData, ContainerNewsEventsProps } from "@/types/cards.types";
import { InfoCardSkeleton } from "../skeleton/InfoCardSkeleton";
import InfoCard from "../Card/InfoCard";

const ContainerNewsEvents = ({
  title,
  btnName,
  type,
  className,
  turnOffTitle,
  turnOffBtn,
}: ContainerNewsEventsProps) => {
  const { data: cards, loading, error } = useFetch<CardData[]>(`/api/${type}`);

  if (error) return <p className="text-red-500">Erro: {error}</p>;

  if (loading) {
    return (
      <section
        className={`${className} flex flex-col items-start justify-start gap-4 w-full px-[5%] 2xl:px-[10%] mb-16`}
      >
        <header className="flex flex-col lg:flex-row items-start gap-4 lg:items-center justify-start lg:justify-between w-full mb-4">
          <div className="text-2xl md:text-3xl font-bold text-[#162456] flex items-center gap-3">
            {type === "noticias" ? (
              <div className="w-1 h-8 bg-gradient-to-b from-[#162456] to-blue-600 rounded-full" />
            ) : (
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
            )}
            {!turnOffTitle && <h2 className="text-3xl font-bold">{title}</h2>}
          </div>
          {!turnOffBtn && (
            <div className="h-10 w-36 bg-gray-200 rounded-xl animate-pulse" />
          )}
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-20 w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <InfoCardSkeleton key={i} index={i} />
          ))}
        </section>
      </section>
    );
  }

  if (!cards || cards.length === 0)
    return <p className="text-white">Nenhum clube encontrado.</p>;

  return (
    <section
      className={`${className} flex flex-col items-start justify-start gap-4 w-full px-[5%] 2xl:px-[10%] mb-16`}
    >
      <header className="flex flex-col lg:flex-row items-start gap-4 lg:items-center justify-start lg:justify-between w-full mb-4">
        <div className="text-2xl md:text-3xl font-bold text-[#162456] flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-[#162456] to-blue-600 rounded-full" />
          {!turnOffTitle && <h2 className="text-3xl font-bold">{title}</h2>}
        </div>
        {!turnOffBtn && (
          <Link
            href={`/${type}`}
            className="group/btn relative flex items-center justify-center w-36 gap-2 px-4 py-2.5 bg-gradient-to-r from-[#162456] to-blue-600 hover:from-blue-600 hover:to-[#162456]
             text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <PlusCircle
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover/btn:rotate-90"
            />
            <span className="">
              {type === "noticias" ? "Notícias" : "Competições"}
            </span>
          </Link>
        )}
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-20 w-full">
        {cards.map((card, index) => (
          <InfoCard key={card.id || index} data={card} type={type} />
        ))}
      </section>
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
