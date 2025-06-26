"use client";

import { ArrowBigDownDash } from "lucide-react";
import * as motion from "motion/react-client";

export default function AnimatedAboutSection() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-start gap-96 px-48"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="flex flex-col items-start justify-center w-2/5 h-full gap-4 ">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Conheça a história da nossa Federação de Basquete
        </h1>
      </div>
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
        <ArrowBigDownDash color="white" size={64} />
      </motion.div>
    </motion.div>
  );
}
