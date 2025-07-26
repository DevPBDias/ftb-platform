// ...existing code...
export interface TeamData {
  id: string;
  teamName: string;
  logo?: string;
  image?: string;
  founded?: string | number;
  description?: string;
  location?: string; //
  stats?: {
    players?: number;
    victories?: number;
    founded?: number;
  };
  championships?: Array<{
    id: number;
    name: string;
    years?: number[];
    quantity: number;
    category: string;
  }>;
  admins?: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
  contact?: string;
}

export interface CalendarTeam {
  id: string;
  teamName: string;
  logo: string;
}

export interface CalendarGame {
  id: string;
  gender: string;
  category: string;
  date: string;
  time: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  championshipId: string;
  championshipName: string;
}
