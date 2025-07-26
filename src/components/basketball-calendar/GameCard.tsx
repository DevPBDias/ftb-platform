"use client";

import { Calendar, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarGame } from "@/types/teams";

interface GameCardProps {
  game: CalendarGame;
  onRemove: (gameId: string) => void;
}

export function GameCard({ game, onRemove }: GameCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-slate-100 hover:border-blue-900">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-medium capitalize"
            >
              {game.gender}
            </Badge>
            <Badge
              variant="outline"
              className="border-slate-300 text-slate-700 font-medium capitalize"
            >
              {game.category}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(game.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={`Logo ${game.homeTeam}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
            <span className="font-bold text-slate-800 text-lg">
              {game.homeTeam}
            </span>
          </div>

          <div className="text-center px-6">
            <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              VS
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-800 text-lg">
              {game.awayTeam}
            </span>
            <img
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={`Logo ${game.awayTeam}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-full">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{formatDate(game.date)}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-full">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="font-medium">{game.time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
