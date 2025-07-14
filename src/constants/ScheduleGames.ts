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

export const tournaments = [
  {
    id: 1,
    title: "RODADA 6 TOCANTINENSE",
    location: "Marista",
    date: "13/06",
    matches: [
      {
        time: "8h",
        category: "Sub 17F",
        teamA: "Palmas FC",
        teamB: "Tocantins EC",
      },
      {
        time: "10h",
        category: "Sub 17F",
        teamA: "Araguaína FC",
        teamB: "Gurupi EC",
      },
      {
        time: "12h",
        category: "Sub 17F",
        teamA: "Capital FC",
        teamB: "Interporto",
      },
      {
        time: "14h",
        category: "Sub 17F",
        teamA: "Tocantinópolis",
        teamB: "Sparta FC",
      },
      {
        time: "16h",
        category: "Sub 17F",
        teamA: "Colinas EC",
        teamB: "Real Araguaína",
      },
      {
        time: "18h",
        category: "Sub 17F",
        teamA: "União FC",
        teamB: "Miracema EC",
      },
    ],
  },
  {
    id: 2,
    title: "RODADA 7 TOCANTINENSE",
    location: "Arena Tocantins",
    date: "20/06",
    matches: [
      {
        time: "9h",
        category: "Sub 15M",
        teamA: "Palmas FC",
        teamB: "Gurupi EC",
      },
      {
        time: "11h",
        category: "Sub 15M",
        teamA: "Capital FC",
        teamB: "Tocantins EC",
      },
      {
        time: "13h",
        category: "Sub 15M",
        teamA: "Araguaína FC",
        teamB: "Sparta FC",
      },
      {
        time: "15h",
        category: "Sub 15M",
        teamA: "Interporto",
        teamB: "Real Araguaína",
      },
      {
        time: "17h",
        category: "Sub 15M",
        teamA: "Colinas EC",
        teamB: "União FC",
      },
    ],
  },
  {
    id: 3,
    title: "RODADA 8 TOCANTINENSE",
    location: "Estádio Nilton Santos",
    date: "27/06",
    matches: [
      {
        time: "8h30",
        category: "Sub 20M",
        teamA: "Tocantinópolis",
        teamB: "Palmas FC",
      },
      {
        time: "10h30",
        category: "Sub 20M",
        teamA: "Gurupi EC",
        teamB: "Capital FC",
      },
      {
        time: "14h",
        category: "Sub 20M",
        teamA: "Araguaína FC",
        teamB: "Interporto",
      },
      {
        time: "16h",
        category: "Sub 20M",
        teamA: "Sparta FC",
        teamB: "Colinas EC",
      },
      {
        time: "18h",
        category: "Sub 20M",
        teamA: "Real Araguaína",
        teamB: "Miracema EC",
      },
    ],
  },
  {
    id: 4,
    title: "COPA TOCANTINS SUB-17",
    location: "Centro Olímpico",
    date: "04/07",
    matches: [
      {
        time: "8h",
        category: "Sub 17F",
        teamA: "Seleção Norte",
        teamB: "Seleção Sul",
      },
      {
        time: "10h",
        category: "Sub 17M",
        teamA: "Palmas United",
        teamB: "Araguaína FC",
      },
      {
        time: "14h",
        category: "Sub 17F",
        teamA: "Capital FC",
        teamB: "Tocantins EC",
      },
      {
        time: "16h",
        category: "Sub 17M",
        teamA: "Gurupi EC",
        teamB: "Interporto",
      },
      {
        time: "18h",
        category: "Final",
        teamA: "Vencedor SF1",
        teamB: "Vencedor SF2",
      },
    ],
  },
  {
    id: 5,
    title: "RODADA 9 TOCANTINENSE",
    location: "Complexo Esportivo",
    date: "11/07",
    matches: [
      {
        time: "9h",
        category: "Sub 19F",
        teamA: "Palmas FC",
        teamB: "Miracema EC",
      },
      {
        time: "11h",
        category: "Sub 19F",
        teamA: "Tocantinópolis",
        teamB: "União FC",
      },
      {
        time: "13h",
        category: "Sub 19M",
        teamA: "Capital FC",
        teamB: "Sparta FC",
      },
      {
        time: "15h",
        category: "Sub 19M",
        teamA: "Araguaína FC",
        teamB: "Colinas EC",
      },
      {
        time: "17h",
        category: "Sub 19M",
        teamA: "Gurupi EC",
        teamB: "Real Araguaína",
      },
    ],
  },
  {
    id: 6,
    title: "FINAL TOCANTINENSE",
    location: "Estádio Castanhão",
    date: "18/07",
    matches: [
      {
        time: "10h",
        category: "3º Lugar F",
        teamA: "Perdedor SF1",
        teamB: "Perdedor SF2",
      },
      {
        time: "14h",
        category: "3º Lugar M",
        teamA: "Perdedor SF1",
        teamB: "Perdedor SF2",
      },
      {
        time: "16h",
        category: "Final F",
        teamA: "Finalista 1",
        teamB: "Finalista 2",
      },
      {
        time: "18h",
        category: "Final M",
        teamA: "Campeão A",
        teamB: "Campeão B",
      },
    ],
  },
];
