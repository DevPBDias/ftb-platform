"use client";

import { useGameForm } from "@/hooks/useGameForm";
import { GameForm } from "./GameForm";
import { GamePreview } from "./GamePreview";

export default function BasketballCalendar() {
  const { games, form, onSubmit, removeGame, getTeamById } = useGameForm();

  return (
    <section className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="w-full relative max-w-7xl space-y-2">
        <div className="w-full text-left space-y-2">
          <h1 className="text-2xl text-[#162456] font-bold">
            Calendário de Basquete
          </h1>
          <p className="text-base text-gray-400 font-normal">
            Organize e gerencie seus jogos de basquete com estilo
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <GameForm form={form} onSubmit={onSubmit} getTeamById={getTeamById} />
          <GamePreview games={games} onRemoveGame={removeGame} />
        </div>
      </div>
    </section>
  );
}
