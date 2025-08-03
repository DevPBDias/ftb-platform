"use client";

import * as motion from "motion/react-client";
import Schedule from "./Schedule";
import { ArrowBigDownDash } from "lucide-react";
import Link from "next/link";
import { useAppConfig } from "@/hooks/useConfig";

export default function AnimatedHeroSection() {
  const { isInscricaoEnabled, loading } = useAppConfig();

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-dvh flex flex-col lg:flex-row items-center justify-center lg:justify-between px-[5%] 2xl:px-[10%] -mt-10 lg:-mt-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="flex flex-col items-center lg:items-start justify-center w-full md:w-4/5 lg:w-[45%] h-full gap-4">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">
          Promovendo o{" "}
          <span className="bg-gradient-to-r from-[#e07b00] to-[#e6b800] text-transparent bg-clip-text uppercase font-bold">
            basquete
          </span>{" "}
          desde a base
        </h1>
        <p className="text-white text-sm lg:text-xl font-normal w-full text-center md:w-3/5 lg:text-left lg:w-full text-balance">
          Com responsabilidade, paixão e olho no futuro de cada jovem atleta.
          Aqui, o basquete vai além do jogo: é crescimento, é comunidade, é
          transformação.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
        <Link href={"/sobre"} className="flex items-center justify-center w-full md:w-3/5 xl:w-60 mt-6 px-6 py-2.5 bg-gradient-to-r from-[#e07b00] to-[#e6b800] text-black rounded-lg hover:bg-yellow-700 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-bold">
          Conhecer mais
        </Link>
        {!loading && isInscricaoEnabled && (
            <Link href={"/inscricao"} className="flex items-center justify-center w-full md:w-3/5 xl:w-60 mt-6 px-6 py-2.5 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-bold">
            Inscrições abertas
          </Link>
        )}
        </div>
      </div>
      <Schedule />
    </motion.div>
  );
}
