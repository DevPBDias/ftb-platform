"use client";

import * as motion from "motion/react-client";
import Schedule from "./Schedule";

export default function AnimatedHeroSection() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-between px-48"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="flex flex-col items-start justify-center w-[45%] h-full gap-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Welcome to the Ultimate Basketball Experience
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl font-normal w-[80%]">
          Join us for an unforgettable journey through the world of basketball,
          where passion meets excellence.
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-blue-950 rounded-lg hover:bg-yellow-700 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-bold">
          Get Started
        </button>
      </div>
      <Schedule />
    </motion.div>
  );
}
