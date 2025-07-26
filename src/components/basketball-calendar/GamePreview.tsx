import { Download, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GameCard } from "./GameCard";
import { CalendarGame } from "@/types/teams";
import { Button } from "../ui/button";

interface GamePreviewProps {
  games: CalendarGame[];
  onRemoveGame: (gameId: string) => void;
  onSaveAllGames: (games: CalendarGame[]) => Promise<void>;
  isSavingAllGames: boolean;
}
export function GamePreview({
  games,
  onRemoveGame,
  onSaveAllGames,
  isSavingAllGames,
}: GamePreviewProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-[#162456] to-blue-600 text-white rounded-t-lg p-4 sm:p-6 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
            <div className="p-2 bg-white/20 rounded-full">
              <Trophy className="h-6 w-6" />
            </div>
            Calendário de Jogos
          </CardTitle>
          <Button
            onClick={() => onSaveAllGames(games)}
            disabled={isSavingAllGames || games.length === 0}
            className="bg-white cursor-pointer text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            {isSavingAllGames ? "Salvando..." : "Salvar Tudo"}
          </Button>
        </div>
        <CardDescription className="text-purple-100 text-sm sm:text-base">
          {games.length}{" "}
          {games.length === 1 ? "jogo agendado" : "jogos agendados"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {games.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-slate-500">
            <div className="mb-4 sm:mb-6">
              <Trophy className="mx-auto h-12 w-12 sm:h-16 sm:w-16 opacity-30" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum jogo agendado</h3>
            <p className="text-sm">
              Use o formulário ao lado para adicionar jogos ao calendário
            </p>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto">
            {games.map((game) => (
              <GameCard key={game.id} game={game} onRemove={onRemoveGame} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
