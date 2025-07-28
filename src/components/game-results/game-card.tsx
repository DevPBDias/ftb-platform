"use client";

import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MatchData } from "@/types/match.type";

interface GameCardProps {
  game: MatchData; // Usa a nova interface MatchData
  onClick?: (imageUrl: string) => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  const getWinnerClasses = (isHomeTeam: boolean) => {
    const homeTeamWins = game.homeTeamPoints > game.awayTeamPoints;
    const awayTeamWins = game.awayTeamPoints > game.homeTeamPoints;
    const isDraw = game.homeTeamPoints === game.awayTeamPoints;

    if (isDraw) return "opacity-60 text-black"; // Branco suave para empate
    if (isHomeTeam && homeTeamWins) return "font-bold text-black"; // Cor primária para o vencedor
    if (!isHomeTeam && awayTeamWins) return "font-bold text-black"; // Cor primária para o vencedor
    return "opacity-60 text-black"; // Branco suave para perdedor
  };

  const handleCardClick = () => {
    let imageUrlToDisplay: string; // Declare explicitamente como string

    // Verifica se game.sumula é um objeto StaticImageData
    if (
      typeof game.sumula === "object" &&
      game.sumula !== null &&
      "src" in game.sumula
    ) {
      imageUrlToDisplay = (game.sumula as StaticImageData).src;
    } else if (typeof game.sumula === "string" && game.sumula) {
      // Se for uma string e não vazia
      imageUrlToDisplay = game.sumula;
    } else {
      // Caso contrário, usa o placeholder genérico
      imageUrlToDisplay = `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(
        game.homeTeam + " vs " + game.awayTeam + " game highlight"
      )}`;
    }

    if (onClick) {
      onClick(imageUrlToDisplay); // Agora imageUrlToDisplay é garantidamente uma string
    }
  };

  return (
    <Card
      className="w-full max-w-[240px] mx-auto flex flex-col justify-between h-full shadow-md hover:shadow-lg transition-shadow duration-200 bg-blue-100 cursor-pointer hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      <CardContent className="px-4 py-2 flex flex-col gap-3">
        {/* Time da Casa */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={`${game.homeTeam} logo`}
              width={40}
              height={40}
              className="rounded-full object-cover shadow-2xl"
            />
            <span
              className={cn(
                "text-sm font-medium text-white",
                getWinnerClasses(true)
              )}
            >
              {game.homeTeam}
            </span>
          </div>
          <div
            className={cn(
              "text-4xl font-extrabold text-white",
              getWinnerClasses(true)
            )}
          >
            {game.homeTeamPoints}
          </div>
        </div>

        {/* Separador */}
        <div className="h-px bg-gray-400 w-full" />

        {/* Time Visitante */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={`${game.awayTeam} logo`}
              width={40}
              height={40}
              className="rounded-full object-cover shadow-2xl"
            />
            <span
              className={cn(
                "text-sm font-medium text-white",
                getWinnerClasses(false)
              )}
            >
              {game.awayTeam}
            </span>
          </div>
          <div
            className={cn(
              "text-4xl font-extrabold text-white",
              getWinnerClasses(false)
            )}
          >
            {game.awayTeamPoints}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
