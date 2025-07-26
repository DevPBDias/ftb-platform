"use client";

import { FullScreenImageOverlay } from "@/components/game-results/full-screen-image-overlay";
import { GameFilters } from "@/components/game-results/game-filters";
import { GameDisplay } from "@/components/game-results/game-pagination";
import { useState } from "react";

export default function ResultsContainer() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedChampionship, setSelectedChampionship] = useState<
    string | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState<string | null>(
    null
  );

  const handleFilterChange = (
    date: Date | undefined,
    championshipId: string | undefined,
    newSearchTerm: string
  ) => {
    setSelectedDate(date);
    setSelectedChampionship(championshipId);
    setSearchTerm(newSearchTerm);
  };

  const handleResetFilters = () => {
    setSelectedDate(undefined);
    setSelectedChampionship(undefined);
    setSearchTerm("");
  };

  const handleCardClick = (imageUrl: string) => {
    setFullScreenImageUrl(imageUrl);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-950">
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        <GameFilters
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          initialDate={selectedDate}
          initialChampionshipId={selectedChampionship}
          initialSearchTerm={searchTerm}
        />
        <GameDisplay
          selectedDate={selectedDate}
          selectedChampionshipId={selectedChampionship}
          searchTerm={searchTerm}
          onCardClick={handleCardClick}
        />

        {fullScreenImageUrl && (
          <FullScreenImageOverlay
            imageUrl={fullScreenImageUrl}
            onClose={() => setFullScreenImageUrl(null)}
          />
        )}
      </div>
    </div>
  );
}
