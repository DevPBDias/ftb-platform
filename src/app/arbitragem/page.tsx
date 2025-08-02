"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Hero/Navbar";
import bg_referee from "@/assets/bg-referee.png";
import Image from "next/image";
import LoadingThreeDotsJumping from "../../components/loading/LoadingBalls";
import { useFetch } from "@/hooks/useFetch";
import { Arbitro } from "@/types/referee.types";
import { ArbitroCard } from "@/components/Card/ArbitroCard";

const RefereePage = () => {
  const {
    data: arbitros,
    loading,
    error,
  } = useFetch<Arbitro[]>("/api/arbitros");

  if (loading) return <LoadingThreeDotsJumping />;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900">
      <section className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden">
        <Image
          src={bg_referee}
          alt="Image of a player holding a basketball in the middle of a park"
          fill
          className="object-cover z-10 opacity-50"
          priority
        />
        <Navbar />
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-12 md:px-8 lg:px-16 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center gap-8">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Quem faz as regras valerem dentro de quadra
            </h1>
            {!arbitros || arbitros.length === 0 ? (
              <p className="text-center text-white text-lg md:text-xl mt-4">
                Nenhum árbitro encontrado no banco de dados.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-center w-full mt-8">
                {arbitros.map((item) => (
                  <ArbitroCard
                    key={item.id}
                    arbitro={item}
                    showActions={false}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default RefereePage;
