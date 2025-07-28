"use client";

import { FullScreenImageOverlay } from "@/components/game-results/full-screen-image-overlay";
import { GameFilters } from "@/components/game-results/game-filters";
import { GameDisplay } from "@/components/game-results/game-pagination";
import { GameFilterProvider } from "@/context/game-results-context";
import { useState } from "react";

export default function Component() {
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState<string | null>(
    null
  );

  const handleCardClick = (imageUrl: string) => {
    setFullScreenImageUrl(imageUrl);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-950">
      <GameFilterProvider onCardClick={handleCardClick}>
        <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
          <GameFilters />
          <GameDisplay />
        </div>

        {fullScreenImageUrl && (
          <FullScreenImageOverlay
            imageUrl={fullScreenImageUrl}
            onClose={() => setFullScreenImageUrl(null)}
          />
        )}
      </GameFilterProvider>
    </div>
  );
}
