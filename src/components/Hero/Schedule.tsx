"use client";
import { gamesData } from "@/constants/ScheduleGames";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useState, useRef } from "react";

const Schedule = () => {
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 12;
    const tiltX = -((y / rect.height) * maxTilt * 2);
    const tiltY = (x / rect.width) * maxTilt * 2;

    setTiltAngle({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTiltAngle({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="hidden lg:flex w-full lg:w-96 h-[324px] lg:h-[500px] bg-blue-950/85 rounded-lg shadow-xl overflow-hidden -mt-32"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX: tiltAngle.x,
        rotateY: tiltAngle.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="w-full h-full flex flex-col items-start justify-start p-3 lg:px-9 lg:py-12 gap-2.5 lg:gap-4"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <h4 className="text-white font-bold uppercase text-lg lg:text-2xl">
          Rodada 6 Tocantinense
        </h4>
        <p className="text-white font-normal text-base lg:text-lg">
          Local: Marista - 13/06
        </p>
        {gamesData.map((game) => (
          <div
            key={game.id}
            className="flex flex-row w-full items-center justify-between text-white"
          >
            <span className="font-normal text-xs lg:text-lg">{game.time}</span>
            <span>-</span>
            <span className="text-xs font-normal text-white">Sub 17F</span>
            <div className="flex items-center justify-center gap-1 lg:gap-2">
              <Image
                src={game.team1.logo}
                className="w-6 h-6 lg:w-10 lg:h-10"
                alt=""
              />
              <p className="font-normal text-base lg:text-lg">
                {game.team1.name}
              </p>
            </div>
            <p className="font-normal text-xs lg:text-lg"> X </p>
            <div className="flex items-center justify-center gap-1 lg:gap-2">
              <p className="font-normal text-base lg:text-lg">
                {game.team2.name}
              </p>
              <Image
                src={game.team2.logo}
                className="w-6 h-6 lg:w-10 lg:h-10"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Schedule;
