"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarGame, CalendarTeam } from "@/types/teams";
import { toast } from "sonner";
import {
  GameFormData,
  gameFormSchema,
} from "@/schemas/basketball-calendar.schema";
import { CHAMPIONSHIPS_DATABASE } from "@/constants/calendarValues";
import { Championship } from "@/types/competicao.types";

export function useGameForm() {
  const [games, setGames] = useState<CalendarGame[]>([]);
  const [teams, setTeams] = useState<CalendarTeam[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<GameFormData>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      gender: "",
      category: "",
      date: "",
      time: "",
      championshipId: "",
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

  const saveAllGamesToDatabase = async (gamesToSave: CalendarGame[]) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Jogos foram salvos");
    } catch (error) {
      toast.error(`Erro ao salvar jogos ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  const getChampionshipById = (
    championshipId: string
  ): Championship | undefined => {
    return CHAMPIONSHIPS_DATABASE.find(
      (championship) => championship.id === championshipId
    );
  };

  const getTeamById = (teamId: string): CalendarTeam | undefined => {
    return teams.find((team) => team.id === teamId);
  };

  const onSubmit = (data: GameFormData) => {
    const homeTeam = getTeamById(data.homeTeamId);
    const awayTeam = getTeamById(data.awayTeamId);
    const championship = getChampionshipById(data.championshipId);

    if (!homeTeam || !awayTeam || !championship) {
      form.setError("root", {
        message: "Erro ao buscar dados dos times ou campeonato",
      });
      return;
    }

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
      championshipName: championship.name,
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
    isSaving,
    onSubmit,
    removeGame,
    getTeamById,
    saveAllGamesToDatabase,
    getChampionshipById,
  };
}
