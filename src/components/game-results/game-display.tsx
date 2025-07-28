"use client";

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
import { useGames } from "@/hooks/use-game-results";
import { GameCardSkeleton } from "../skeleton/GameCardFilterSkeleton";
import { GameCard } from "./game-card";

export function GameDisplay() {
  const {
    currentGames,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
    gamesPerPage,
    onCardClick,
  } = useGames();

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
          {currentGames.map((game, index) => (
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
