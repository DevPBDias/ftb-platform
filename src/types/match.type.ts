import { StaticImageData } from "next/image";

export interface MatchData {
  id?: string;
  category: string;
  gender: string;
  championshipId: string;
  championshipName: string;
  homeTeamId: string;
  homeTeam: string;
  homeTeamLogo: string;
  homeTeamPoints: number;
  awayTeamId: string;
  awayTeam: string;
  awayTeamLogo: string;
  awayTeamPoints: number;
  matchType: string;
  date: string;
  time: string;
  sumula?: StaticImageData | string;
  status: string;
}
