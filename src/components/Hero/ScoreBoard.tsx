import Image from "next/image";
import * as motion from "motion/react-client";
import { gameScores } from "@/constants/gameScores";
import { formatDate } from "@/utils/formatterDate";

const ScoreBoard = () => {
  return (
    <motion.div
      className="absolute -bottom-52 left-0 w-full flex flex-col items-start justify-center p-9 gap-9 rounded-lg px-48"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <section className="flex flex-col items-center justify-center w-full bg-blue-950/85 p-9 gap-9 rounded-lg">
        <div className="flex flex-row items-center justify-start gap-4 w-full">
          <h1 className="text-2xl font-bold text-white">Tocantinense</h1>
          <span className="rounded-lg border border-white py-1 px-2 font-normal text-white text-xs">
            Rodada 5
          </span>
        </div>
        <section className="grid grid-cols-5 items-center justify-center w-full gap-16">
          {gameScores.map((game, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-between w-full rounded-lg gap-4"
            >
              <div className="flex flex-row items-start justify-between w-full border-b border-white/80 pb-1 ">
                <h1 className="text-white font-normal text-sm">{game.time}</h1>
                <p className="text-white font-normal text-sm">
                  Jogo {game.number}
                </p>
                <span className="text-white font-normal text-sm">
                  {formatDate(game.date)}
                </span>
              </div>
              <div className="flex flex-col items-center w-full gap-2">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-white font-bold text-base">
                      {game.team1.name}
                    </p>
                    <Image
                      src={game.team1.logo}
                      alt={game.team1.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <p
                    className={`text-white border px-2 py-1 min-w-12 border-white rounded-lg ${
                      game.score1 > game.score2 ? "font-bold" : "font-normal"
                    }`}
                  >
                    {game.score1}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-white font-bold text-base">
                      {game.team2.name}
                    </h1>
                    <Image
                      src={game.team2.logo}
                      alt={game.team2.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <p
                    className={`text-white border text-center px-2 py-1 min-w-12 border-white rounded-lg ${
                      game.score2 > game.score1 ? "font-bold" : "font-normal"
                    }`}
                  >
                    {game.score2}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </motion.div>
  );
};

export default ScoreBoard;
