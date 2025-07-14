"use client";

import type React from "react";
import { AnimatePresence, motion, wrap } from "motion/react";
import { forwardRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const games = [
  {
    id: 1,
    homeTeam: {
      name: "Lakers",
      city: "Los Angeles",
      score: 108,
      color: "#552583",
    },
    awayTeam: {
      name: "Warriors",
      city: "Golden State",
      score: 112,
      color: "#1D428A",
    },
    status: "FINAL",
    quarter: "4th",
    timeRemaining: "00:00",
    date: "Dec 28, 2024",
  },
  {
    id: 2,
    homeTeam: {
      name: "Celtics",
      city: "Boston",
      score: 95,
      color: "#007A33",
    },
    awayTeam: {
      name: "Heat",
      city: "Miami",
      score: 89,
      color: "#98002E",
    },
    status: "LIVE",
    quarter: "3rd",
    timeRemaining: "7:42",
    date: "Dec 28, 2024",
  },
  {
    id: 3,
    homeTeam: {
      name: "Nets",
      city: "Brooklyn",
      score: 0,
      color: "#000000",
    },
    awayTeam: {
      name: "Knicks",
      city: "New York",
      score: 0,
      color: "#006BB6",
    },
    status: "UPCOMING",
    quarter: "",
    timeRemaining: "8:00 PM ET",
    date: "Dec 29, 2024",
  },
  {
    id: 4,
    homeTeam: {
      name: "Mavericks",
      city: "Dallas",
      score: 124,
      color: "#00538C",
    },
    awayTeam: {
      name: "Suns",
      city: "Phoenix",
      score: 118,
      color: "#E56020",
    },
    status: "FINAL",
    quarter: "OT",
    timeRemaining: "00:00",
    date: "Dec 28, 2024",
  },
  {
    id: 5,
    homeTeam: {
      name: "Bulls",
      city: "Chicago",
      score: 87,
      color: "#CE1141",
    },
    awayTeam: {
      name: "Bucks",
      city: "Milwaukee",
      score: 92,
      color: "#00471B",
    },
    status: "LIVE",
    quarter: "4th",
    timeRemaining: "2:15",
    date: "Dec 28, 2024",
  },
  {
    id: 6,
    homeTeam: {
      name: "Clippers",
      city: "LA",
      score: 0,
      color: "#C8102E",
    },
    awayTeam: {
      name: "Nuggets",
      city: "Denver",
      score: 0,
      color: "#0E2240",
    },
    status: "UPCOMING",
    quarter: "",
    timeRemaining: "10:30 PM ET",
    date: "Dec 29, 2024",
  },
];

export default function UsePresenceData() {
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const currentIndex = games.findIndex((game) => game.id === selectedGame.id);
    const nextIndex = wrap(0, games.length, currentIndex + newDirection);
    setSelectedGame(games[nextIndex]);
    setDirection(newDirection);
  }

  return (
    <div className="lg:hidden flex relative justify-center items-center gap-2 w-full max-w-3xl mx-auto my-8 px-3 ">
      <motion.button
        initial={false}
        animate={{ backgroundColor: "#162556" }}
        aria-label="Previous"
        className="w-8 h-8 rounded-full flex justify-center items-center relative z-10 text-white outline-offset-2"
        onClick={() => setSlide(-1)}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeftIcon size={20} color="white" />
      </motion.button>
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <Slide
          key={selectedGame.id}
          game={selectedGame}
          direction={direction}
        />
      </AnimatePresence>
      <motion.button
        initial={false}
        animate={{ backgroundColor: "#162556" }}
        aria-label="Next"
        className="w-8 h-8 rounded-full flex justify-center items-center relative z-10 text-white outline-offset-2"
        onClick={() => setSlide(1)}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRightIcon size={20} color="white" />
      </motion.button>
    </div>
  );
}

const Slide = forwardRef(function Slide(
  { game, direction }: { game: (typeof games)[0]; direction: number },
  ref: React.Ref<HTMLDivElement>
) {
  const getStatusColor = () => {
    switch (game.status) {
      case "LIVE":
        return "bg-orange-500";
      case "FINAL":
        return "bg-gray-500";
      case "UPCOMING":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  const getWinnerClasses = (isHome: boolean) => {
    if (game.status !== "FINAL") return "";
    const homeWins = game.homeTeam.score > game.awayTeam.score;
    const isWinner = isHome ? homeWins : !homeWins;
    return isWinner ? "font-bold text-emerald-600" : "opacity-70";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="w-full md:w-80 bg-blue-950/90 rounded-2xl overflow-hidden shadow-2xl text-white"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-gray-700">
        <div
          className={`px-3 py-1 rounded-xl text-xs font-semibold text-white uppercase ${getStatusColor()}`}
        >
          {game.status}
        </div>
        <div className="flex items-center gap-2">
          {game.status === "LIVE" && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-orange-500">
                {game.quarter}
              </span>
              <span className="text-sm font-medium text-gray-300">
                {game.timeRemaining}
              </span>
            </div>
          )}
          {game.status === "UPCOMING" && (
            <span className="text-sm font-medium text-gray-300">
              {game.timeRemaining}
            </span>
          )}
          {game.status === "FINAL" && game.quarter === "OT" && (
            <span className="text-xs font-semibold text-amber-500 uppercase">
              OVERTIME
            </span>
          )}
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="p-5 flex flex-col gap-4">
        {/* Away Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex-shrink-0" />
            <div>
              <div
                className={`text-xs text-gray-400 font-medium uppercase tracking-wider ${getWinnerClasses(
                  false
                )}`}
              >
                {game.awayTeam.city}
              </div>
              <div
                className={`text-lg font-semibold text-white mt-0.5 ${getWinnerClasses(
                  false
                )}`}
              >
                {game.awayTeam.name}
              </div>
            </div>
          </div>
          <div
            className={`text-3xl font-bold text-white min-w-[60px] text-right ${getWinnerClasses(
              false
            )}`}
          >
            {game.status === "UPCOMING" ? "-" : game.awayTeam.score}
          </div>
        </div>

        {/* Home Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex-shrink-0"
              style={{ backgroundColor: game.homeTeam.color }}
            />
            <div>
              <div
                className={`text-xs text-gray-400 font-medium uppercase tracking-wider ${getWinnerClasses(
                  true
                )}`}
              >
                {game.homeTeam.city}
              </div>
              <div
                className={`text-lg font-semibold text-white mt-0.5 ${getWinnerClasses(
                  true
                )}`}
              >
                {game.homeTeam.name}
              </div>
            </div>
          </div>
          <div
            className={`text-3xl font-bold text-white min-w-[60px] text-right ${getWinnerClasses(
              true
            )}`}
          >
            {game.status === "UPCOMING" ? "-" : game.homeTeam.score}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-700 bg-blue-950/80">
        <span className="text-xs text-gray-500 font-medium">{game.date}</span>
      </div>
    </motion.div>
  );
});
