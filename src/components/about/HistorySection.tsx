"use client";

import React from "react";
import EmptyState from "./EmptyState";
import { useHistory } from "@/hooks/useHistory";
import { AnimatedTimelineItem } from "./animated-timeline-item";

const HistorySection = () => {
  const { histories, loading, error } = useHistory();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4 2xl:px-60 mt-[150px] lg:mt-[550px] mb-24 gap-24">
        <EmptyState
          title="Carregando histórias..."
          message="Aguarde enquanto buscamos as histórias da federação."
          type="loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4 2xl:px-60 mt-[150px] lg:mt-[550px] mb-24 gap-24">
        <EmptyState
          title="Erro ao carregar histórias"
          message={`Não foi possível carregar as histórias: ${error}`}
          type="error"
        />
      </div>
    );
  }

  if (histories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4 2xl:px-60 mt-[150px] lg:mt-[550px] mb-24 gap-24">
        <EmptyState
          title="Nenhuma história encontrada"
          message="Ainda não há histórias cadastradas. Volte mais tarde!"
          type="empty"
        />
      </div>
    );
  }

  // Converter dados de história para o formato da timeline
  const timelineEvents = histories.map((history) => ({
    monthYear: `${history.year}`,
    title: history.title || "Evento Histórico",
    location: history.event || "",
    description: history.description,
    imageSrc: typeof history.image === 'string' ? history.image : history.image.src,
    imageAlt: history.title || "Imagem histórica"
  }));

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[150px] lg:mt-[550px]">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        História da Federação Tocantinense de Basquetebol
      </h1>

      <div className="relative max-w-5xl mx-auto">
        {/* Linha Central da Timeline (Desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-timeline-line-start to-timeline-line-end hidden md:block"></div>
        {/* Linha da Timeline (Mobile) */}
        <div className="absolute left-6 h-full w-1 bg-gradient-to-b from-timeline-line-start to-timeline-line-end md:hidden"></div>

        {timelineEvents.map((event, index) => (
          <AnimatedTimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default HistorySection;


