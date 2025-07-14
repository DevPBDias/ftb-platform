"use client";

import logoA from "@/assets/teamA.png";
import logoB from "@/assets/teamB.png";
import { AnimatePresence, motion, wrap } from "motion/react";
import { forwardRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarDays,
  LocateFixedIcon,
} from "lucide-react";
import Image from "next/image";
import { tournaments } from "@/constants/ScheduleGames";

export default function GameList() {
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0]);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const currentIndex = tournaments.findIndex(
      (tournament) => tournament.id === selectedTournament.id
    );
    const nextIndex = wrap(0, tournaments.length, currentIndex + newDirection);
    setSelectedTournament(tournaments[nextIndex]);
    setDirection(newDirection);
  }

  return (
    <div className="lg:hidden w-full px-2 md:px-0">
      <div className="flex relative justify-center items-center gap-1.5 md:gap-6">
        <motion.button
          initial={false}
          animate={{ backgroundColor: "#162556" }}
          aria-label="Previous"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center relative z-10 text-white outline-offset-2 shadow-lg"
          onClick={() => setSlide(-1)}
          whileFocus={{ outline: "2px solid #10B981" }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeftIcon size={24} color="white" />
        </motion.button>
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide
            key={selectedTournament.id}
            tournament={selectedTournament}
            direction={direction}
          />
        </AnimatePresence>
        <motion.button
          initial={false}
          animate={{ backgroundColor: "#162556" }}
          aria-label="Next"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center relative z-10 text-white outline-offset-2 shadow-lg"
          onClick={() => setSlide(1)}
          whileFocus={{ outline: "2px solid #10B981" }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRightIcon size={24} color="white" />
        </motion.button>
      </div>
    </div>
  );
}

const Slide = forwardRef(function Slide(
  {
    tournament,
    direction,
  }: { tournament: (typeof tournaments)[0]; direction: number },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="my-8 lg:hidden w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-2xl text-white relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-left py-4 px-4 md:py-6 md:px-6 border-b border-white/20">
          <h2 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide">
            {tournament.title}
          </h2>
          <div className="flex sm:flex-row justify-start items-center gap-4 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <LocateFixedIcon className="w-4 h-4" />
              <span className="font-medium">Local: {tournament.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="font-medium">{tournament.date}</span>
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="p-3 md:p-6 space-y-2 md:space-y-3">
          {tournament.matches.map((match, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-3 sm:gap-0 bg-blue-950/80 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="flex flex-col items-start gap-1 md:gap-3 flex-1 justify-center w-full sm:w-auto">
                <div className="flex items-center gap-1">
                  <Image src={logoA} alt="Team A Logo" width={40} height={40} />
                  <span className="font-medium text-xs md:text-sm truncate max-w-[80px] md:max-w-none">
                    {match.teamA}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Image src={logoB} alt="Team B Logo" width={40} height={40} />
                  <span className="font-medium text-xs md:text-sm truncate max-w-[80px] md:max-w-none">
                    {match.teamB}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-base md:text-lg font-bold min-w-[45px] md:min-w-[50px]">
                  {match.time}
                </div>
                <div className="text-[10px] md:text-xs border border-white px-2 py-1 rounded-full font-semibold">
                  {match.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});
