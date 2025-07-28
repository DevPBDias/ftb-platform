"use client";

import { useGameFilterContext } from "@/context/game-results-context";

export function useGameFilters() {
  const {
    selectedDate,
    selectedChampionshipId,
    searchTerm,
    championships,
    handleFilterChange,
    handleResetFilters,
  } = useGameFilterContext();

  return {
    selectedDate,
    selectedChampionshipId,
    searchTerm,
    championships,
    handleFilterChange,
    handleResetFilters,
  };
}
