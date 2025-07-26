import { formatDate } from "@/utils/formatterDate";
import { format } from "date-fns";

export const championships = [
  { id: "1", name: "Campeonato Brasileiro Série A" },
  { id: "2", name: "Copa Libertadores" },
  { id: "3", name: "Premier League" },
  { id: "4", name: "La Liga" },
  { id: "5", name: "UEFA Champions League" },
];

export const generateMockGames = (count: number) => {
  const games = [];
  const today = new Date();
  const teamNames = [
    "Flamengo",
    "Palmeiras",
    "Corinthians",
    "São Paulo",
    "Grêmio",
    "Internacional",
    "Atlético-MG",
    "Fluminense",
    "Botafogo",
    "Vasco",
    "Real Madrid",
    "Barcelona",
    "Manchester United",
    "Liverpool",
    "Bayern Munich",
    "PSG",
    "Juventus",
    "Milan",
    "Inter Milan",
    "Arsenal",
  ];

  for (let i = 0; i < count; i++) {
    const team1Index = Math.floor(Math.random() * teamNames.length);
    let team2Index = Math.floor(Math.random() * teamNames.length);
    while (team2Index === team1Index) {
      team2Index = Math.floor(Math.random() * teamNames.length);
    }
    const randomChampionship =
      championships[Math.floor(Math.random() * championships.length)];
    const randomDate = new Date(
      today.getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ); // Games from last 30 days
    randomDate.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
      0,
      0
    );

    games.push({
      id: `game-${i + 1}`,
      name: `${teamNames[team1Index]} vs ${teamNames[team2Index]}`,
      championshipId: randomChampionship.id,
      date: formatDate(randomDate.toDateString()),
      time: format(randomDate, "HH:mm"),
      team1Name: teamNames[team1Index],
      team1Score: Math.floor(Math.random() * 5),
      team1Logo: `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(
        teamNames[team1Index]
      )}`,
      team2Name: teamNames[team2Index],
      team2Score: Math.floor(Math.random() * 5),
      team2Logo: `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(
        teamNames[team2Index]
      )}`,
    });
  }
  return games;
};

export const games = generateMockGames(50); // Generate 50 mock games
