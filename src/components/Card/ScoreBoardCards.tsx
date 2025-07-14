import { IGameScore } from "@/constants/gameScores";
import { formatDate } from "@/utils/formatterDate";
import Image from "next/image";

interface GameProps {
  game: IGameScore;
}

const ScoreBoardCard = ({ game }: GameProps) => {
  return (
    <div className="flex flex-col items-start justify-between w-full rounded-lg 2xl:gap-4">
      <div className="flex flex-row items-start justify-between w-full border-b border-white/80 pb-1 ">
        <h1 className="text-white font-normal text-sm">{game.time}</h1>
        <p className="text-white font-normal text-sm">Jogo {game.number}</p>
        <span className="text-white font-normal text-sm">
          {formatDate(game.date)}
        </span>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-bold text-base">{game.team1.name}</p>
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
  );
};

export default ScoreBoardCard;
