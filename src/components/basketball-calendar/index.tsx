"use client";

import { useGameForm } from "@/hooks/useGameForm";
import { GameForm } from "./GameForm";
import { GamePreview } from "./GamePreview";

export default function BasketballCalendar() {
  const {
    games,
    form,
    onSubmit,
    removeGame,
    getTeamById,
    saveAllGamesToDatabase,
    isSaving,
  } = useGameForm();

  return (
    <section className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="w-full relative mr-auto p-4 sm:p-6 space-y-2">
        <div className="w-full text-left space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#162456] font-bold">
            Calendário de Basquete
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 font-medium">
            Organize e gerencie seus jogos de basquete com estilo
          </p>
        </div>

        <div className="w-full grid gap-6 lg:grid-cols-2">
          <GameForm form={form} onSubmit={onSubmit} getTeamById={getTeamById} />

          <GamePreview
            games={games}
            onRemoveGame={removeGame}
            onSaveAllGames={saveAllGamesToDatabase}
            isSavingAllGames={isSaving}
          />
        </div>
      </div>
    </section>
  );
}
