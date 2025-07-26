import { Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GameCard } from "./GameCard";
import { CalendarGame } from "@/types/teams";

interface GamePreviewProps {
  games: CalendarGame[];
  onRemoveGame: (gameId: string) => void;
}

export function GamePreview({ games, onRemoveGame }: GamePreviewProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/0 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-[#162456] to-blue-600 text-white rounded-t-lg py-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-white/20 rounded-full">
            <Trophy className="h-6 w-6" />
          </div>
          Calendário de Jogos
        </CardTitle>
        <CardDescription className="text-purple-100">
          {games.length}{" "}
          {games.length === 1 ? "jogo agendado" : "jogos agendados"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {games.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <div className="mb-6">
              <Trophy className="mx-auto h-16 w-16 opacity-30" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum jogo agendado</h3>
            <p className="text-sm">
              Use o formulário ao lado para adicionar jogos ao calendário
            </p>
          </div>
        ) : (
          <div className="space-y-2 overflow-y-auto">
            {games.map((game) => (
              <GameCard key={game.id} game={game} onRemove={onRemoveGame} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
