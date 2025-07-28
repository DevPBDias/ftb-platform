"use client";

import type React from "react";
import { format } from "date-fns";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useGameFilters } from "@/hooks/use-game-filters"; // Importa o custom hook
import { Championship } from "@/context/game-results-context";

export function GameFilters() {
  const {
    selectedDate,
    selectedChampionshipId,
    searchTerm,
    championships, // Agora vem do contexto
    handleFilterChange,
    handleResetFilters,
  } = useGameFilters();

  const handleDateChange = (date: Date | undefined) => {
    handleFilterChange(date, selectedChampionshipId, searchTerm);
  };

  const handleChampionshipChange = (championshipId: string | undefined) => {
    handleFilterChange(selectedDate, championshipId, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(selectedDate, selectedChampionshipId, e.target.value);
  };

  return (
    <div className="hidden border-r bg-white dark:bg-gray-900 md:block shadow-sm">
      <div className="flex h-full max-h-screen flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Filtros de Jogos
        </h2>
        <div className="grid gap-6">
          <div>
            <label
              htmlFor="search-team"
              className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
            >
              Buscar por Time
            </label>
            <div className="relative mt-2">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                id="search-team"
                type="text"
                placeholder="Nome do time..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="date-filter"
              className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
            >
              Filtrar por Data
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2 h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-700",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg text-gray-900 dark:text-gray-100">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label
              htmlFor="championship-filter"
              className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
            >
              Filtrar por Campeonato
            </label>
            <Select
              onValueChange={handleChampionshipChange}
              value={selectedChampionshipId}
            >
              <SelectTrigger className="w-full mt-2 h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-700">
                <SelectValue placeholder="Selecione um campeonato" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg text-gray-900 dark:text-gray-100">
                {championships.map((champ: Championship) => (
                  <SelectItem
                    key={champ.id}
                    value={champ.id ? champ.id : "Sem nome"}
                  >
                    {champ.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="h-10 rounded-md border border-blue-700 bg-blue-800 text-gray-100 hover:bg-blue-700 hover:text-white"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
