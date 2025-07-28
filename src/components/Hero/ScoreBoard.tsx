"use client";
import type React from "react";
import { motion, wrap } from "motion/react";
import { forwardRef, useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { MatchData } from "@/types/match.type";
import Image from "next/image";

const CARD_WIDTH = 200;
const GAP_WIDTH = 12;

export default function Schedule() {
  const [games, setGames] = useState<MatchData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/resultados");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: MatchData[] = await response.json();
        setGames(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const numGames = games.length;

  const setSlide = (newDirection: 1 | -1) => {
    setCurrentIndex((prevIndex) => wrap(0, numGames, prevIndex + newDirection));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-8 px-4 text-white">
        <h3 className="text-white w-full text-left pl-6 text-2xl font-bold mb-4">
          Resultados dos jogos
        </h3>
        <div className="text-lg">Carregando jogos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-8 px-4 text-white">
        <h3 className="text-white w-full text-left pl-6 text-2xl font-bold mb-4">
          Resultados dos jogos
        </h3>
        <div className="text-lg text-red-500">
          Erro ao carregar jogos: {error}
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-8 px-4 text-white">
        <h3 className="text-white w-full text-left pl-6 text-2xl font-bold mb-4">
          Resultados dos jogos
        </h3>
        <div className="text-lg">Nenhum jogo disponível.</div>
      </div>
    );
  }

  return (
    <main className="absolute -bottom-40 right-0 z-50 flex items-center justify-center w-full">
      <div className="flex flex-col relative justify-center items-center w-full px-[5%] lg:px-[10%]">
        <div className="relative flex items-center justify-center w-full">
          {/* Previous Button */}
          <motion.button
            initial={false}
            animate={{ backgroundColor: "#162556" }}
            aria-label="Previous"
            className="absolute left-0 z-20 w-10 h-10 rounded-full flex justify-center items-center text-white outline-offset-2 shadow-lg"
            onClick={() => setSlide(-1)}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeftIcon size={24} color="white" />
          </motion.button>

          {/* Carousel Content */}
          <div className="relative w-full overflow-hidden px-12">
            <motion.div
              className="flex gap-4"
              animate={{ x: -(currentIndex * (CARD_WIDTH + GAP_WIDTH)) }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {games.map((game) => (
                <Slide key={game.id} game={game} />
              ))}
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            initial={false}
            animate={{ backgroundColor: "#162556" }}
            aria-label="Next"
            className="absolute right-0 z-20 w-10 h-10 rounded-full flex justify-center items-center text-white outline-offset-2 shadow-lg"
            onClick={() => setSlide(1)}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRightIcon size={24} color="white" />
          </motion.button>
        </div>
      </div>
    </main>
  );
}

const Slide = forwardRef(function Slide(
  { game }: { game: MatchData },
  ref: React.Ref<HTMLDivElement>
) {
  const getStatusColor = () => {
    switch (game.status) {
      case "finalizado":
        return "bg-blue-600";
      case "agendado":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getWinnerClasses = (isHome: boolean) => {
    if (game.status !== "finalizado") return "";
    const homeWins = game.homeTeamPoints > game.awayTeamPoints;
    const isWinner = isHome ? homeWins : !homeWins;
    return isWinner
      ? "font-bold text-white-400 text-2xl"
      : "opacity-60 text-gray-400 text-2xl";
  };

  return (
    <div
      ref={ref}
      className="flex-shrink-0 w-full md:w-[350px] bg-slate-900 rounded-2xl overflow-hidden shadow-xl text-white border border-slate-800"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-3 border-b border-slate-800 gap-2">
        <h4 className="text-sm lg:text-base text-gray-300 font-semibold">
          {game.championshipName}
        </h4>
        <p
          className={`px-2 py-1 rounded-full text-[10px] lg:text-xs font-semibold text-white uppercase ${getStatusColor()}`}
        >
          {game.status}
        </p>
      </div>

      {/* Teams and Scores */}
      <div className="p-5 flex flex-col gap-4">
        {/* Away Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={`${game.awayTeam} logo`}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0 object-cover"
            />
            <div>
              <div
                className={`text-sm lg:text-lg font-semibold text-white mt-0.5 ${getWinnerClasses(
                  false
                )}`}
              >
                {game.awayTeam}
              </div>
            </div>
          </div>
          <div
            className={`text-xl lg:text-2xl font-extrabold text-white min-w-[60px] text-right ${getWinnerClasses(
              false
            )}`}
          >
            {game.status === "agendado" ? "-" : game.awayTeamPoints}
          </div>
        </div>
        {/* Home Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={`${game.homeTeam} logo`}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0 object-cover"
            />
            <div>
              <div
                className={`text-sm lg:text-lg font-semibold text-white mt-0.5 ${getWinnerClasses(
                  true
                )}`}
              >
                {game.homeTeam}
              </div>
            </div>
          </div>
          <div
            className={`text-xl lg:text-2xl font-extrabold text-white min-w-[60px] text-right ${getWinnerClasses(
              true
            )}`}
          >
            {game.status === "agendado" ? "-" : game.homeTeamPoints}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/80 flex flex-row justify-between items-center">
        <span className="text-xs text-gray-400 font-medium capitalize">
          {game.category}
        </span>
        <span className="text-xs text-gray-400 font-medium">{game.date}</span>
      </div>
    </div>
  );
});
