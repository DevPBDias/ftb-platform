"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Hero/Navbar";
import bg_referee from "@/assets/bg-referee.png";
import Image from "next/image";
import userPhoto from "@/assets/error-image.png";
import LoadingThreeDotsJumping from "../../components/loading/LoadingBalls";
import { useFetch } from "@/hooks/useFetch";
import { Arbitro } from "@/types/referee.types";

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
                  <motion.div
                    key={item.id}
                    className="relative group w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={item.photo || userPhoto}
                      alt={`Árbitro ${item.name}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3 md:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="text-sm md:text-base font-bold truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs md:text-sm font-normal mt-1">
                        {item.experience} - {item.years}{" "}
                        {item.years > 1 ? "anos" : "ano"}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2 px-1 md:px-2 text-xs md:text-sm font-semibold group-hover:opacity-0 transition-opacity duration-300">
                      {item.name}
                    </div>
                  </motion.div>
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
