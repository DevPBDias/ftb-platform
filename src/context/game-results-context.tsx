"use client";

import type React from "react";

import {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { format } from "date-fns";
import { MatchData } from "@/types/match.type";

export interface Championship {
  id: string;
  name: string;
}

interface GameFilterContextType {
  selectedDate?: Date;
  selectedChampionshipId?: string;
  searchTerm: string;
  fetchedGames: MatchData[];
  filteredAndSortedGames: MatchData[];
  championships: Championship[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  gamesPerPage: number;
  handleFilterChange: (
    date: Date | undefined,
    championshipId: string | undefined,
    searchTerm: string
  ) => void;
  handleResetFilters: () => void;
  handlePageChange: (page: number) => void;
  onCardClick: (imageUrl: string) => void;
}

const GameFilterContext = createContext<GameFilterContextType | undefined>(
  undefined
);

interface GameFilterProviderProps {
  children: React.ReactNode;
  onCardClick: (imageUrl: string) => void;
}

const GAMES_PER_PAGE = 12; // 4 cards por linha * 3 linhas

export function GameFilterProvider({
  children,
  onCardClick,
}: GameFilterProviderProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedChampionshipId, setSelectedChampionshipId] = useState<
    string | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fetchedGames, setFetchedGames] = useState<MatchData[]>([]);
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch games from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/resultados");
        if (!response.ok) {
          throw new Error("Falha ao buscar os jogos");
        }
        const data: MatchData[] = await response.json();
        setFetchedGames(data);

        // Extract unique championships from fetched games
        const uniqueChampionships = Array.from(
          new Map(
            data.map((game) => [
              game.championshipId,
              { id: game.championshipId, name: game.championshipName },
            ])
          ).values()
        );
        setChampionships(uniqueChampionships);

        setCurrentPage(1); // Reset page to 1 when new data is fetched
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        // Optionally, set an error state to display a user-friendly message
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Filter and sort games based on current filters
  const filteredAndSortedGames = useMemo(() => {
    let filtered = fetchedGames;

    if (selectedDate) {
      const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
      filtered = filtered.filter((game) => game.date === formattedSelectedDate);
    }

    if (selectedChampionshipId) {
      filtered = filtered.filter(
        (game) => game.championshipId === selectedChampionshipId
      );
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.homeTeam.toLowerCase().includes(lowerCaseSearchTerm) ||
          game.awayTeam.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    filtered.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });

    return filtered;
  }, [fetchedGames, selectedDate, selectedChampionshipId, searchTerm]);

  const totalPages = Math.ceil(filteredAndSortedGames.length / GAMES_PER_PAGE);

  // Handle filter changes
  const handleFilterChange = useCallback(
    (
      date: Date | undefined,
      championshipId: string | undefined,
      newSearchTerm: string
    ) => {
      setIsLoading(true); // Activate loading when filters change
      setTimeout(() => {
        setSelectedDate(date);
        setSelectedChampionshipId(championshipId);
        setSearchTerm(newSearchTerm);
        setCurrentPage(1); // Always reset to first page on filter change
        setIsLoading(false);
      }, 300); // Simulate network delay for filter application
    },
    []
  );

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    setIsLoading(true); // Activate loading on reset
    setTimeout(() => {
      setSelectedDate(undefined);
      setSelectedChampionshipId(undefined);
      setSearchTerm("");
      setCurrentPage(1); // Reset page to 1
      setIsLoading(false);
    }, 300); // Simulate network delay for reset
  }, []);

  // Handle page changes
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || isLoading) return;
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
      }, 300); // Simulate network delay for pagination
    },
    [totalPages, isLoading]
  );

  const contextValue = useMemo(
    () => ({
      selectedDate,
      selectedChampionshipId,
      searchTerm,
      fetchedGames,
      filteredAndSortedGames,
      championships,
      isLoading,
      currentPage,
      totalPages,
      gamesPerPage: GAMES_PER_PAGE,
      handleFilterChange,
      handleResetFilters,
      handlePageChange,
      onCardClick,
    }),
    [
      selectedDate,
      selectedChampionshipId,
      searchTerm,
      fetchedGames,
      filteredAndSortedGames,
      championships,
      isLoading,
      currentPage,
      totalPages,
      handleFilterChange,
      handleResetFilters,
      handlePageChange,
      onCardClick,
    ]
  );

  return (
    <GameFilterContext.Provider value={contextValue}>
      {children}
    </GameFilterContext.Provider>
  );
}

export function useGameFilterContext() {
  const context = useContext(GameFilterContext);
  if (context === undefined) {
    throw new Error(
      "useGameFilterContext must be used within a GameFilterProvider"
    );
  }
  return context;
}
