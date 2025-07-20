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
