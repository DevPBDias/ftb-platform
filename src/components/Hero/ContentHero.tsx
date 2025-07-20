"use client";

import * as motion from "motion/react-client";
import Schedule from "./Schedule";
import { ArrowBigDownDash } from "lucide-react";

export default function AnimatedHeroSection() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-dvh flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 2xl:px-48 -mt-10 lg:-mt-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="flex flex-col items-start md:items-center lg:items-start justify-center w-full md:w-4/5 lg:w-[45%] h-full gap-4">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold md:text-center lg:text-left text-balance">
          Promovendo o basquete{" "}
          <span className="text-yellow-500 uppercase">Tocantinense</span> desde
          a base
        </h1>
        <p className="text-white text-sm lg:text-xl font-normal w-full md:text-center md:w-3/5 lg:text-left lg:w-full text-balance">
          Com responsabilidade, paixão e olho no futuro de cada jovem atleta.
          Aqui, o basquete vai além do jogo: é crescimento, é comunidade, é
          transformação.
        </p>
        <button className="w-full md:w-3/5 xl:w-60 mt-6 px-6 py-2.5 bg-yellow-500 text-black rounded-lg hover:bg-yellow-700 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-bold">
          Quero saber mais
        </button>
      </div>
      <Schedule />
      <motion.div
        className="lg:hidden md:-mt-40"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <ArrowBigDownDash color="white" size={36} />
      </motion.div>
    </motion.div>
  );
}
