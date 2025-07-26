"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: {
    id: string;
    name: string;
    date: string;
    time: string;
    team1Name: string;
    team1Score: number;
    team1Logo: string;
    team2Name: string;
    team2Score: number;
    team2Logo: string;
  };
  onClick?: (imageUrl: string) => void; // Nova prop para o clique
}

export function GameCard({ game, onClick }: GameCardProps) {
  const getWinnerClasses = (isTeam1: boolean) => {
    const team1Wins = game.team1Score > game.team2Score;
    const team2Wins = game.team2Score > game.team1Score;
    const isDraw = game.team1Score === game.team1Score; // Corrigido para verificar empate corretamente

    if (isDraw) return "opacity-60 text-white"; // Branco suave para empate
    if (isTeam1 && team1Wins) return "font-bold text-blue-400"; // Cor primária para o vencedor
    if (!isTeam1 && team2Wins) return "font-bold text-blue-400"; // Cor primária para o vencedor
    return "opacity-60 text-white"; // Branco suave para perdedor
  };

  const handleCardClick = () => {
    if (onClick) {
      // Gerar uma URL de placeholder maior para a imagem em tela cheia
      const fullScreenImageQuery = `${game.team1Name} vs ${game.team2Name} game highlight`;
      const fullScreenImageUrl = `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(
        fullScreenImageQuery
      )}`;
      onClick(fullScreenImageUrl);
    }
  };

  return (
    <Card
      className="w-full max-w-[240px] mx-auto flex flex-col justify-between h-full shadow-md hover:shadow-lg transition-shadow duration-200 bg-blue-800 border-blue-700 cursor-pointer"
      onClick={handleCardClick} // Adiciona o manipulador de clique ao card
    >
      <CardContent className="p-4 flex flex-col gap-4">
        {/* Time 1 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={game.team1Logo || "/placeholder.svg"}
              alt={`${game.team1Name} logo`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span
              className={cn(
                "text-sm font-medium text-white",
                getWinnerClasses(true)
              )}
            >
              {game.team1Name}
            </span>
          </div>
          <div
            className={cn(
              "text-4xl font-extrabold text-white",
              getWinnerClasses(true)
            )}
          >
            {game.team1Score}
          </div>
        </div>

        {/* Separador */}
        <div className="h-px bg-blue-700 w-full" />

        {/* Time 2 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={game.team2Logo || "/placeholder.svg"}
              alt={`${game.team2Name} logo`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span
              className={cn(
                "text-sm font-medium text-white",
                getWinnerClasses(false)
              )}
            >
              {game.team2Name}
            </span>
          </div>
          <div
            className={cn(
              "text-4xl font-extrabold text-white",
              getWinnerClasses(false)
            )}
          >
            {game.team2Score}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
