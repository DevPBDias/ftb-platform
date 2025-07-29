"use client";
import { motion } from "motion/react";
import { CalendarDays, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { MatchData } from "@/types/match.type";
import Image from "next/image";

export default function MobileSchedule() {
  const [upcomingGames, setUpcomingGames] = useState<MatchData[]>([]);
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

        const filteredGames = data.filter((game) => game.status === "agendado");
        setUpcomingGames(filteredGames);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="lg:hidden block relative w-full max-w-sm sm:max-w-md lg:max-w-lg mb-8 px-4 mt-52"
    >
      <div className="relative overflow-hidden rounded-3xl">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-blue-700/80 to-blue-800/80"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8), rgba(30, 58, 138, 0.8))",
              "linear-gradient(90deg, rgba(29, 78, 216, 0.8), rgba(30, 58, 138, 0.8), rgba(37, 99, 235, 0.8))",
              "linear-gradient(135deg, rgba(30, 58, 138, 0.8), rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8))",
              "linear-gradient(45deg, rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8), rgba(30, 58, 138, 0.8))",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Glass Effect Layer */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-300/30 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative p-4 md:p-6 text-white">
            <div className="flex items-center justify-center mb-3">
              <CalendarDays size={28} className="text-blue-300 mr-2" />
              <h4 className="text-xl md:text-2xl font-semibold">
                Agenda de Jogos
              </h4>
            </div>
            {loading && (
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2 className="h-7 w-7 animate-spin text-blue-400" />
                <p className="mt-1 text-blue-300 text-sm">Carregando...</p>
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 py-6">
                <p className="text-sm">Erro ao carregar jogos: {error}</p>
              </div>
            )}
            {!loading && !error && upcomingGames.length === 0 && (
              <div className="text-center text-gray-400 py-6">
                <p className="text-sm">Nenhum jogo próximo encontrado.</p>
              </div>
            )}
            {!loading && !error && upcomingGames.length > 0 && (
              <div className="pr-2">
                {upcomingGames.map((game) => (
                  <div
                    key={game.id}
                    className="mb-3 pb-3 border-b border-white/10 last:border-b-0 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-200 mb-2">
                      <span className="mb-0.5 sm:mb-0 w-full text-center">
                        {game.date}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-base font-semibold">
                      <div className="flex items-center gap-1.5 mb-0.5 sm:mb-2">
                        <Image
                          width={32}
                          height={32}
                          src={game.homeTeamLogo || "/placeholder.svg"}
                          alt={`${game.homeTeam} logo`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{game.homeTeam}</span>
                      </div>
                      <span className="text-gray-200 text-base sm:text-base w-full text-center">
                        vs
                      </span>
                      <div className="w-full flex items-center gap-1.5">
                        <span className="ml-auto">{game.awayTeam}</span>
                        <Image
                          width={32}
                          height={32}
                          src={game.awayTeamLogo || "/placeholder.svg"}
                          alt={`${game.awayTeam} logo`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-200 mt-1 w-full text-center">
                      {game.category} - {game.championshipName}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
