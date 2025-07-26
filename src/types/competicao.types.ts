import { StaticImageData } from "next/image";

export interface CompeticaoData {
  id?: string;
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
