import logoA from "@/assets/teamA.png";
import logoB from "@/assets/teamB.png";
import { StaticImageData } from "next/image";

type Game = {
  id: string;
  team1: {
    name: string;
    logo: StaticImageData;
  };
  team2: {
    name: string;
    logo: StaticImageData;
  };
  time: string;
  date: string;
};

export const gamesData: Game[] = [
  {
    id: "Jogo 1",
    team1: { name: "Time A", logo: logoA },
    team2: { name: "Time B", logo: logoB },
    time: "8h",
    date: "2023-10-01T00:00:00",
  },
  {
    id: "Jogo 2",
    team1: { name: "Time A", logo: logoA },
    team2: { name: "Time B", logo: logoB },
    time: "10h",
    date: "2023-10-01T00:00:00",
  },
  {
    id: "Jogo 3",
    team1: { name: "Time A", logo: logoA },
    team2: { name: "Time B", logo: logoB },
    time: "12h",
    date: "2023-10-01T00:00:00",
  },
  {
    id: "Jogo 4",
    team1: { name: "Time A", logo: logoA },
    team2: { name: "Time B", logo: logoB },
    time: "14h",
    date: "2023-10-01T00:00:00",
  },
  {
    id: "Jogo 5",
    team1: { name: "Time A", logo: logoA },
    team2: { name: "Time B", logo: logoB },
    time: "16h",
    date: "2023-10-01T00:00:00",
  },
  {
    id: "Jogo 6",
    team1: { name: "Time A", logo: logoA },
    team2: { name: "Time B", logo: logoB },
    time: "18h",
    date: "2023-10-01T00:00:00",
  },
];
