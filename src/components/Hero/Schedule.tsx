"use client";
import logoA from "@/assets/teamA.png";
import logoB from "@/assets/teamB.png";
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
      className="w-96 h-[500px] bg-blue-950/85 rounded-lg shadow-xl overflow-hidden"
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
        className="w-full h-full flex flex-col items-start justify-start px-9 py-12 gap-4"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <h4 className="text-white font-bold uppercase text-2xl">
          Rodada 6 Tocantinense
        </h4>
        <p className="text-white font-normal text-lg">Local: Marista - 13/06</p>
        {gamesData.map((game) => (
          <div
            key={game.id}
            className="flex flex-row w-full items-center justify-between text-white"
          >
            <span className="font-normal text-lg">{game.time}</span>
            <div className="flex items-center justify-center gap-2">
              <Image src={game.team1.logo} width={40} height={40} alt="" />
              <p className="font-normal text-lg">{game.team1.name}</p>
            </div>
            <p> vs </p>
            <div className="flex items-center justify-center gap-2">
              <p className="font-normal text-lg">{game.team2.name}</p>
              <Image src={game.team2.logo} width={40} height={40} alt="" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Schedule;
