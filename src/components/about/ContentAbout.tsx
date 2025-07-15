"use client";

import { ArrowBigDownDash } from "lucide-react";
import * as motion from "motion/react-client";

export default function AnimatedAboutSection() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full lg:mt-0 h-full flex flex-col lg:flex-row items-center justify-center gap-48 lg:gap-96 px-[5%] lg:px-[10%] 2xl:px-[15%]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <h1 className="text-white text-3xl md:text-4xl lg::text-6xl font-bold text-center lg:text-left w-full lg:w-2/5">
        Conheça a história da nossa Federação de Basquete
      </h1>
      <motion.div
        animate={{
          y: [0, -30, 0], // Moves up 30px then back
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <ArrowBigDownDash color="white" size={40} />
      </motion.div>
    </motion.div>
  );
}
