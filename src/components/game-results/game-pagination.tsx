"use client";

import { useState, useMemo, useEffect } from "react"; // Importa useEffect
import { format } from "date-fns";
import { motion } from "framer-motion";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { games } from "@/constants/resultsData";
import { GameCardSkeleton } from "../skeleton/GameCardFilterSkeleton";
import { GameCard } from "./game-card";

interface GameDisplayProps {
  selectedDate?: Date;
  selectedChampionshipId?: string;
  searchTerm: string; // Nova prop
  onCardClick: (imageUrl: string) => void;
}

export function GameDisplay({
  selectedDate,
  selectedChampionshipId,
  searchTerm,
  onCardClick,
}: GameDisplayProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const gamesPerPage = 12; // 4 cards por linha * 3 linhas

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

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
          game.team1Name.toLowerCase().includes(lowerCaseSearchTerm) ||
          game.team2Name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    filtered.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });

    return filtered;
  }, [selectedDate, selectedChampionshipId, searchTerm]); // Adiciona searchTerm às dependências

  const totalPages = Math.ceil(filteredAndSortedGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = filteredAndSortedGames.slice(
    startIndex,
    startIndex + gamesPerPage
  );

  // Efeito para resetar a página e ativar o loading quando os filtros mudam
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setCurrentPage(1); // Sempre volta para a primeira página ao mudar filtros
      setIsLoading(false);
    }, 500); // Simula um atraso de rede
    return () => clearTimeout(timer);
  }, [selectedDate, selectedChampionshipId, searchTerm]); // Depende dos filtros e termo de busca

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500); // Simula um atraso de rede
  };

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8 bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-100">
          Resultados dos Jogos
        </h1>
      </div>
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {Array.from({ length: gamesPerPage }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      ) : currentGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
          <p>Nenhum jogo encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {currentGames.map((game: any, index: number) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GameCard game={game} onClick={onCardClick} />
            </motion.div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={cn(
                    "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-50",
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  )}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-50",
                        page === currentPage
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                          : ""
                      )}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={cn(
                    "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-50",
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}
