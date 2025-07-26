"use client";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "@/schemas/game-register.schema";

interface ChampionshipTeamSectionProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  championships: { id: string; name: string }[];
  selectedChampionship: string | undefined;
  availableTeams: string[];
}

export function ChampionshipTeamSection({
  control,
  register,
  errors,
  championships,
  selectedChampionship,
  availableTeams,
}: ChampionshipTeamSectionProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="championship">Campeonato</Label>
        <Controller
          control={control}
          name="championshipId"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="championship">
                <SelectValue placeholder="Selecione o campeonato" />
              </SelectTrigger>
              <SelectContent>
                {championships.map((champ) => (
                  <SelectItem key={champ.id} value={champ.id}>
                    {champ.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <span className="italic text-sm font-normal text-gray-400">
          Obs: Os times só podem ser selecionados após escolha do campeonato.
        </span>
        {errors.championshipId && (
          <p className="text-red-500 text-sm">
            {errors.championshipId.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="team1Name">Time 1</Label>
          <Controller
            control={control}
            name="team1Name"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedChampionship}
              >
                <SelectTrigger id="team1Name">
                  <SelectValue placeholder="Selecione o Time 1" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.team1Name && (
            <p className="text-red-500 text-sm">{errors.team1Name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="team1Score">Pontuação do Time 1</Label>
          <Input
            id="team1Score"
            type="number"
            placeholder="Ex: 105"
            {...register("team1Score", { valueAsNumber: true })}
          />
          {errors.team1Score && (
            <p className="text-red-500 text-sm">{errors.team1Score.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="team2Name">Time 2</Label>
          <Controller
            control={control}
            name="team2Name"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedChampionship}
              >
                <SelectTrigger id="team2Name">
                  <SelectValue placeholder="Selecione o Time 2" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.team2Name && (
            <p className="text-red-500 text-sm">{errors.team2Name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="team2Score">Pontuação do Time 2</Label>
          <Input
            id="team2Score"
            type="number"
            placeholder="Ex: 98"
            {...register("team2Score", { valueAsNumber: true })}
          />
          {errors.team2Score && (
            <p className="text-red-500 text-sm">{errors.team2Score.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
