"use client";

import { Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./FormField";
import { type Control, Controller } from "react-hook-form";
import { useGameForm } from "@/hooks/useGameForm";
import { GameFormData } from "@/schemas/basketball-calendar.schema";
import { CalendarTeam } from "@/types/teams";

interface TeamSelectorProps {
  control: Control<GameFormData>;
  homeTeamError?: string;
  awayTeamError?: string;
  homeTeamId: string;
  awayTeamId: string;
  getTeamById: (teamId: string) => CalendarTeam | undefined;
}

export function TeamSelector({
  control,
  homeTeamError,
  awayTeamError,
  homeTeamId,
  awayTeamId,
  getTeamById,
}: TeamSelectorProps) {
  const { teams } = useGameForm();

  return (
    <div className="w-full space-y-2 mt-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <span className="text-lg font-semibold text-slate-800">Times</span>
      </div>

      <div className="w-full space-y-4 grid md:grid-cols-2 gap-4">
        <Controller
          name="homeTeamId"
          control={control}
          render={({ field }) => (
            <FormField label="Time da Casa" error={homeTeamError} required>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`py-2 mt-1 w-full border-2 transition-colors ${
                    homeTeamError
                      ? "border-red-300 hover:border-red-400"
                      : "border-slate-200 hover:border-blue-900"
                  }`}
                >
                  <SelectValue placeholder="Selecione o time da casa" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      <div className="flex items-center gap-3">
                        <img
                          src={team.logo || "/placeholder.svg"}
                          alt={team.teamName}
                          className="w-6 h-6 rounded-full border border-slate-200"
                        />
                        <span className="font-medium">{team.teamName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}
        />

        <Controller
          name="awayTeamId"
          control={control}
          render={({ field }) => (
            <FormField label="Time Visitante" error={awayTeamError} required>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`py-2 mt-1 w-full border-2 transition-colors ${
                    awayTeamError
                      ? "border-red-300 hover:border-red-400"
                      : "border-slate-200 hover:border-blue-900"
                  }`}
                >
                  <SelectValue placeholder="Selecione o time visitante" />
                </SelectTrigger>
                <SelectContent>
                  {teams
                    .filter((team) => team.id !== homeTeamId)
                    .map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        <div className="flex items-center gap-3">
                          <img
                            src={team.logo || "/placeholder.svg"}
                            alt={team.teamName}
                            className="w-6 h-6 rounded-full border border-slate-200"
                          />
                          <span className="font-medium">{team.teamName}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormField>
          )}
        />
      </div>
      {(homeTeamId || awayTeamId) && (
        <div className="mt-3 w-full p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <h4 className="text-sm font-semibold mb-3 text-slate-700">
            Preview do Confronto:
          </h4>
          <div className="flex items-center justify-center gap-6">
            {homeTeamId && (
              <div className="flex items-center gap-3">
                <img
                  src={getTeamById(homeTeamId)?.logo || "/placeholder.svg"}
                  alt="Home team"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <span className="text-sm font-bold text-slate-700">
                  {getTeamById(homeTeamId)?.teamName}
                </span>
              </div>
            )}

            {homeTeamId && awayTeamId && (
              <div className="px-4 py-2 bg-gradient-to-r from-[#162456] to-blue-600 text-white font-bold rounded-full shadow-lg">
                VS
              </div>
            )}

            {awayTeamId && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700">
                  {getTeamById(awayTeamId)?.teamName}
                </span>
                <img
                  src={getTeamById(awayTeamId)?.logo || "/placeholder.svg"}
                  alt="Away team"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
