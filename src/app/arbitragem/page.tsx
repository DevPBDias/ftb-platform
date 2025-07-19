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
  if (!arbitros || arbitros.length === 0)
    return <p className="text-white">Nenhum árbitro encontrado.</p>;

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center">
        <picture className="w-full h-full">
          <Image
            src={bg_referee}
            alt="Image of a player holding a basketball in the middle of a park"
            className="w-full h-full object-cover"
            priority
          />
        </picture>
        <Navbar />
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-[3%] lg:px-[8%] 2xl:px-[8%] gap-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full gap-12 ">
            <h1 className="text-white text-3xl md:text-4xl font-bold w-full lg:w-3/4 text-center mt-24">
              Quem faz as regras valerem dentro de quadra
            </h1>
            <div className="flex flex-wrap flex-row gap-2 2xl:gap-4 items-center justify-center w-full">
              {arbitros?.length === 0 ? (
                <p className="text-center text-white text-lg">
                  Nenhum árbitro encontrado no banco de dados.
                </p>
              ) : (
                arbitros?.map((item) => (
                  <picture
                    key={item.id}
                    className="relative w-[108px] h-[108px] md:w-40 md:h-40 2xl:w-52 2xl:h-60 rounded-lg hover:scale-105 transition-transform duration-300"
                  >
                    {item.photo && (
                      <Image
                        src={item.photo}
                        alt={`Árbitro ${item.name}`}
                        className="w-full h-full object-cover rounded-lg"
                        fill
                        priority
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/208x208/cccccc/333333?text=Foto`;
                        }}
                      />
                    )}
                    {!item.photo && (
                      <picture className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 text-xs">
                        <Image
                          src={userPhoto}
                          alt={`Árbitro ${item.name}`}
                          className="w-full h-full object-cover rounded-lg"
                          fill
                          priority
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/208x208/cccccc/333333?text=Foto`;
                          }}
                        />
                      </picture>
                    )}
                    <div className="absolute z-10 bottom-0 left-0 px-3 py-2 w-full bg-blue-950/90 flex flex-col items-start justify-center text-white rounded-b-sm">
                      <h4 className="text-xs font-bold md:text-base lg:text-lg">
                        {item.name}
                      </h4>
                      <p className="hidden lg:flex text-sm font-normal">
                        {item.experience} - {item.years}{" "}
                        {item.years > 1 ? "anos" : "ano"}
                      </p>
                    </div>
                  </picture>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default RefereePage;
