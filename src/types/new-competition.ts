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
