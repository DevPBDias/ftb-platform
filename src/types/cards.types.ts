// cards.types.ts
import { StaticImageData } from "next/image";

export type CardData = {
  id?: string;
  titulo: string;
  descricao: string;
  datas: string[];
  local: string;
  image?: string | StaticImageData | undefined;
};

export interface ContainerNewsEventsProps {
  title: string;
  btnName: string;
  type: "noticias" | "competicoes";
  className?: string;
  turnOffBtn?: boolean;
  turnOffTitle?: boolean;
}

export interface InfoCardProps {
  data: {
    id?: string;
    titulo: string;
    descricao: string;
    datas: string[];
    local: string;
    image?: string | StaticImageData;
  };
  type?: "noticias" | "competicoes";
  index?: number;
}

export interface GameCard {
  id: string;
  name: string;
  date: string;
  time: string;
  team1Name: string;
  team1Score: number;
  team1Logo: string;
  team2Name: string;
  team2Score: number;
  team2Logo: string;
}

export type MemberFederation = {
  id: string;
  name: string;
  jobFunction: string[]; // Aqui já está string[], conforme a saída do schema
  history: string;
  image?: StaticImageData | string;
  category?: "member" | "mention";
};
