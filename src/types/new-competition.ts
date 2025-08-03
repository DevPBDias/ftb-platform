import type { StaticImageData } from "next/image";

export interface CompeticaoData {
  id?: string;
  titulo: string;
  descricao: string;
  datas: string[]; // Array of date strings
  local: string;
  image?: string | StaticImageData | undefined;
}

export interface NoticiaData {
  id?: string;
  titulo: string;
  descricao: string;
  datas: string[]; // Array of date strings
  local: string;
  image?: string | StaticImageData | undefined;
}

export type ItemType = "noticia" | "competicao" | "ambos";

export interface ItemData {
  id: string;
  type: ItemType;
  titulo: string;
  descricao: string;
  datas: string[];
  local: string;
  image?: string | StaticImageData | undefined;
}

export interface Championship {
  id: string;
  name: string;
}

export interface Player {
  id: string;
  name: string;
  document: string;
}

export interface Coach {
  id: string;
  name: string;
  document?: string;
}

export interface Assistant {
  id: string;
  name: string;
  document?: string;
}

export interface TeamRelation {
  id: string;
  name: string;
  coach: Coach | null;
  assistant: Assistant[] | null;
  players: Player[];
  category: string;
  paymentStatus: boolean;
  paymentDate?: string;
}

export type ChampionshipsDataDB = {
  name: string;
  category: string;
  teams: TeamRelation[];
};
