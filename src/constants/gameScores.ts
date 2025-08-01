import logoA from "@/assets/teamA.png";
import logoB from "@/assets/teamB.png";
import { StaticImageData } from "next/image";

export type IGameScore = {
  id: number;
  team1: {
    name: string;
    logo: StaticImageData;
  };
  score1: number;
  team2: {
    name: string;
    logo: StaticImageData;
  };
  score2: number;
  time: string;
  date: string;
  number: number;
};

export const gameScores: IGameScore[] = [
  {
    id: 1,
    team1: { name: "Time A", logo: logoA },
    score1: 100,
    team2: { name: "Time B", logo: logoB },
    score2: 98,
    time: "15:00",
    date: "2023-10-01T00:00:00",
    number: 1,
  },
  {
    id: 2,
    team1: { name: "Time A", logo: logoA },
    score1: 100,
    team2: { name: "Time B", logo: logoB },
    score2: 98,
    time: "15:00",
    date: "2023-10-01T00:00:00",
    number: 1,
  },
  {
    id: 3,
    team1: { name: "Time A", logo: logoA },
    score1: 100,
    team2: { name: "Time B", logo: logoB },
    score2: 98,
    time: "15:00",
    date: "2023-10-01T00:00:00",
    number: 1,
  },
  {
    id: 4,
    team1: { name: "Time A", logo: logoA },
    score1: 100,
    team2: { name: "Time B", logo: logoB },
    score2: 98,
    time: "15:00",
    date: "2023-10-01T00:00:00",
    number: 1,
  },
  {
    id: 5,
    team1: { name: "Time A", logo: logoA },
    score1: 100,
    team2: { name: "Time B", logo: logoB },
    score2: 98,
    time: "15:00",
    date: "2023-10-01T00:00:00",
    number: 1,
  },
];
