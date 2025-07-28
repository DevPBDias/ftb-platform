"use client";

import { useGameFilterContext } from "@/context/game-results-context";

export function useGames() {
  const {
    filteredAndSortedGames,
    isLoading,
    currentPage,
    totalPages,
    gamesPerPage,
    handlePageChange,
    onCardClick,
  } = useGameFilterContext();

  // Calculate current games for display based on pagination
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = filteredAndSortedGames.slice(
    startIndex,
    startIndex + gamesPerPage
  );

  return {
    currentGames,
    isLoading,
    currentPage,
    totalPages,
    gamesPerPage,
    handlePageChange,
    onCardClick,
  };
}
