"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Hero/Navbar";
import bg_teams from "@/assets/bg_teams.png";
import teamA from "@/assets/teamA.png";
import teamB from "@/assets/teamB.png";
import teamC from "@/assets/teamC.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileHeader from "@/components/header/MobileHeader";

const TEAMS_LOGO = [
  teamA,
  teamB,
  teamC,
  teamA,
  teamB,
  teamC,
  teamA,
  teamB,
  teamC,
];

const Teams = () => {
  const route = useRouter();

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center">
        <picture className="w-full h-full">
          <Image
            src={bg_teams}
            alt="Image of a player holding a basketball in the middle of a park"
            className="w-full h-full object-cover"
          />
        </picture>
        <Navbar />
        <MobileHeader />
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-24 px-4 2xl:px-48"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1 className="text-white text-2xl md:text-4xl font-bold w-full md:w-3/5 text-center lg:w-1/2 lg:text-left 2xl:w-1/3">
            CONHEÇA OS CLUBES E ESCOLAS PARTICIPANTES DE NOSSAS COMPETIÇÕES
          </h1>
          <div className="grid grid-cols-3 gap-3 md:gap-6 items-center justify-center">
            {TEAMS_LOGO.map((logo, index) => (
              <picture
                key={index}
                className="cursor-pointer w-20 h-20 md:w-32 md:h-32 rounded-lg border-2 border-white transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-amber-500"
                onClick={() => route.push(`/clubes/${index + 1}`)}
              >
                <Image
                  src={logo}
                  alt={`Team logo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </picture>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Teams;
