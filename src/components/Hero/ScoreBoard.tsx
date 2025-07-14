import * as motion from "motion/react-client";
import { gameScores } from "@/constants/gameScores";
import ScoreBoardCard from "../Card/ScoreBoardCards";

const ScoreBoard = () => {
  return (
    <motion.div
      className="absolute -bottom-52 left-0 w-full hidden lg:flex flex-col items-start justify-center p-4 gap-9 rounded-lg 2xl:px-48"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <section className="flex flex-col items-center justify-center w-full bg-blue-950/85 px-4 py-8 2xl:p-9 gap-9 rounded-lg">
        <div className="flex flex-row items-center justify-start gap-4 w-full">
          <h1 className="text-2xl font-bold text-white">Tocantinense</h1>
          <span className="rounded-lg border border-white py-1 px-2 font-normal text-white text-xs">
            Rodada 5
          </span>
        </div>
        <section className="grid grid-cols-5 items-center justify-center w-full gap-6 2xl:gap-16">
          {gameScores.map((game, index) => (
            <ScoreBoardCard game={game} key={index} />
          ))}
        </section>
      </section>
    </motion.div>
  );
};

export default ScoreBoard;
