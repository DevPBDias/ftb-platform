"use client";

import { Calendar, Clock, Trash2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarGame } from "@/types/teams";
import { formatDateWithDayName } from "@/utils/formatterDate";
import Image from "next/image";

interface GameCardProps {
  game: CalendarGame;
  onRemove: (gameId: string) => void;
}

export function GameCard({ game, onRemove }: GameCardProps) {
  console.log(game.homeTeamLogo, game.awayTeamLogo);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-slate-100 hover:border-orange-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
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
            {game.championshipName && (
              <Badge
                variant="outline"
                className="border-purple-300 text-purple-700 font-medium flex items-center gap-1"
              >
                <Trophy className="h-3 w-3" /> {game.championshipName}
              </Badge>
            )}
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

        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4 gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={`Logo ${game.homeTeam}`}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
            <span className="font-bold text-slate-800 text-base sm:text-lg">
              {game.homeTeam}
            </span>
          </div>

          <div className="text-center px-4">
            <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              VS
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800 text-base sm:text-lg">
              {game.awayTeam}
            </span>
            <Image
              width={40}
              height={40}
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={`Logo ${game.awayTeam}`}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-full">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="font-medium">
              {formatDateWithDayName(game.date)}
            </span>
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
