"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarGame, CalendarTeam } from "@/types/teams";
import {
  GameFormData,
  gameFormSchema,
} from "@/schemas/basketball-calendar.schema";

export function useGameForm() {
  const [games, setGames] = useState<CalendarGame[]>([]);
  const [teams, setTeams] = useState<CalendarTeam[]>([]);

  const form = useForm<GameFormData>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      gender: "",
      category: "",
      date: "",
      time: "",
      homeTeamId: "",
      awayTeamId: "",
    },
  });

  useEffect(() => {
    const getTeamDatabse = async () => {
      const response = await fetch("/api/clubes");
      const data = await response.json();

      const timesFiltrados = data.map(
        ({
          id,
          teamName,
          logo,
        }: {
          id: string;
          teamName: string;
          logo: string;
        }) => ({
          id,
          teamName,
          logo,
        })
      );

      setTeams(timesFiltrados);
    };
    getTeamDatabse();
  }, []);

  const getTeamById = (teamId: string): CalendarTeam | undefined => {
    return teams.find((team) => team.id === teamId);
  };

  const onSubmit = (data: GameFormData) => {
    const homeTeam = getTeamById(data.homeTeamId);
    const awayTeam = getTeamById(data.awayTeamId);

    if (!homeTeam || !awayTeam) {
      form.setError("root", { message: "Erro ao buscar dados dos times" });
      return;
    }

    const newGame: CalendarGame = {
      id: Date.now().toString(),
      ...data,
      homeTeam: homeTeam.teamName,
      awayTeam: awayTeam.teamName,
      homeTeamLogo: homeTeam.logo,
      awayTeamLogo: awayTeam.logo,
    };

    setGames((prev) => [...prev, newGame]);
    form.reset();
  };

  const removeGame = (gameId: string) => {
    setGames((prev) => prev.filter((game) => game.id !== gameId));
  };

  const sortedGames = games.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return {
    games: sortedGames,
    form,
    teams,
    onSubmit,
    removeGame,
    getTeamById,
  };
}
