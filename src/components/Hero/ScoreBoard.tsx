"use client";
import type React from "react";
import { motion, wrap, useMotionValue, useTransform, PanInfo } from "motion/react";
import { forwardRef, useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { MatchData } from "@/types/match.type";
import Image from "next/image";

// Configurações responsivas para diferentes dispositivos
const getDeviceConfig = () => {
  if (typeof window === 'undefined') return { cardWidth: 350, gapWidth: 12, cardsToShow: 1 };
  
  const width = window.innerWidth;
  
  if (width < 640) { // Mobile pequeno
    return { cardWidth: 300, gapWidth: 8, cardsToShow: 1 };
  } else if (width < 768) { // Mobile
    return { cardWidth: 320, gapWidth: 10, cardsToShow: 1 };
  } else if (width < 1024) { // Tablet
    return { cardWidth: 340, gapWidth: 12, cardsToShow: 1 };
  } else { // Desktop
    return { cardWidth: 350, gapWidth: 12, cardsToShow: 1 };
  }
};

export default function Schedule() {
  const [games, setGames] = useState<MatchData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deviceConfig, setDeviceConfig] = useState(getDeviceConfig());

  // Motion values para drag
  const x = useMotionValue(0);
  const xInput = [0, deviceConfig.cardWidth + deviceConfig.gapWidth];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #162556 0%, #1e3a8a 100%)",
    "linear-gradient(180deg, #1e3a8a 0%, #162556 100%)",
  ]);

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
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Atualizar configuração do dispositivo quando a tela mudar
  useEffect(() => {
    const handleResize = () => {
      setDeviceConfig(getDeviceConfig());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numGames = games.length;

  const setSlide = (newDirection: 1 | -1) => {
    const step = deviceConfig.cardsToShow;
    setCurrentIndex((prevIndex) => wrap(0, numGames, prevIndex + (newDirection * step)));
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = (deviceConfig.cardWidth + deviceConfig.gapWidth) * 0.3;
    
    if (info.offset.x > threshold && currentIndex > 0) {
      setSlide(-1);
    } else if (info.offset.x < -threshold && currentIndex < numGames - 1) {
      setSlide(1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-8 px-4 text-white">
        <p className="text-lg">Carregando jogos...</p>
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
      <div className="flex flex-col relative justify-center items-center w-full px-2 sm:px-[5%] lg:px-[10%]">
        <div className="relative flex items-center justify-center w-full">
          {/* Previous Button */}
          <motion.button
            initial={false}
            animate={{ backgroundColor: "#162556" }}
            aria-label="Previous"
            className="absolute left-0 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center text-white outline-offset-2 shadow-lg"
            onClick={() => setSlide(-1)}
            whileTap={{ scale: 0.9 }}
            style={{ background: background }}
          >
            <ArrowLeftIcon size={20} className="sm:w-6 sm:h-6" color="white" />
          </motion.button>

          {/* Carousel Content */}
          <div className="relative w-full overflow-hidden px-10 sm:px-12">
            <motion.div
              className="flex gap-4 cursor-grab active:cursor-grabbing"
              animate={{ x: -(currentIndex * (deviceConfig.cardWidth + deviceConfig.gapWidth)) }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              style={{ x }}
            >
              {games.map((game) => (
                <Slide key={game.id} game={game} cardWidth={deviceConfig.cardWidth} />
              ))}
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            initial={false}
            animate={{ backgroundColor: "#162556" }}
            aria-label="Next"
            className="absolute right-0 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center text-white outline-offset-2 shadow-lg"
            onClick={() => setSlide(1)}
            whileTap={{ scale: 0.9 }}
            style={{ background: background }}
          >
            <ArrowRightIcon size={20} className="sm:w-6 sm:h-6" color="white" />
          </motion.button>
        </div>
      </div>
    </main>
  );
}

const Slide = forwardRef(function Slide(
  { game, cardWidth }: { game: MatchData; cardWidth: number },
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
      className="flex-shrink-0 bg-slate-900 rounded-2xl overflow-hidden shadow-xl text-white border border-slate-800"
      style={{ width: cardWidth }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-3 sm:px-4 py-2 sm:py-3 border-b border-slate-800 gap-1 sm:gap-2">
        <h4 className="text-xs sm:text-sm lg:text-base text-gray-300 font-semibold truncate">
          {game.championshipName}
        </h4>
        <p
          className={`px-2 py-1 rounded-full text-[8px] sm:text-[10px] lg:text-xs font-semibold text-white uppercase ${getStatusColor()}`}
        >
          {game.status}
        </p>
      </div>

      {/* Teams and Scores */}
      <div className="p-3 sm:p-5 flex flex-col gap-3 sm:gap-4">
        {/* Away Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Image
              width={40}
              height={40}
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={`${game.awayTeam} logo`}
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0">
              <div
                className={`text-xs sm:text-sm lg:text-lg font-semibold text-white mt-0.5 truncate ${getWinnerClasses(
                  false
                )}`}
              >
                {game.awayTeam}
              </div>
            </div>
          </div>
          <div
            className={`text-lg sm:text-xl lg:text-2xl font-extrabold text-white min-w-[40px] sm:min-w-[60px] text-right ml-2 ${getWinnerClasses(
              false
            )}`}
          >
            {game.status === "agendado" ? "-" : game.awayTeamPoints}
          </div>
        </div>
        {/* Home Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Image
              width={40}
              height={40}
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={`${game.homeTeam} logo`}
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0">
              <div
                className={`text-xs sm:text-sm lg:text-lg font-semibold text-white mt-0.5 truncate ${getWinnerClasses(
                  true
                )}`}
              >
                {game.homeTeam}
              </div>
            </div>
          </div>
          <div
            className={`text-lg sm:text-xl lg:text-2xl font-extrabold text-white min-w-[40px] sm:min-w-[60px] text-right ml-2 ${getWinnerClasses(
              true
            )}`}
          >
            {game.status === "agendado" ? "-" : game.homeTeamPoints}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="px-3 sm:px-5 py-2 sm:py-3 border-t border-slate-800 bg-slate-900/80 flex flex-row justify-between items-center">
        <span className="text-[10px] sm:text-xs text-gray-400 font-medium capitalize truncate">
          {game.category}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-400 font-medium truncate ml-2">
          {game.date}
        </span>
      </div>
    </div>
  );
});
