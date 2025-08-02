import { StaticImageData } from "next/image";

export interface NoticiasResponse {
  id?: string;
  titulo: string;
  descricao: string;
  datas: string[];
  local: string;
  image?: string | StaticImageData;
  type?: string;
}

export interface NoticiaData {
  id?: string;
  titulo: string;
  descricao: string;
  datas: string[];
  local: string;
  image?: string | StaticImageData | undefined;
}
