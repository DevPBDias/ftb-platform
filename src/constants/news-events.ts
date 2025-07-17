import image1 from "@/assets/kids_playing.png";
import image2 from "@/assets/referee.png";
import image3 from "@/assets/3x3.png";
import { StaticImageData } from "next/image";

export type CardData = {
  id: string;
  title: string;
  date: string;
  description?: string;
  imageUrl: StaticImageData;
  type: "noticia" | "competicao";
};

export const cardsData: CardData[] = [
  // Últimas notícias
  {
    id: "noticia-1",
    title: "Aberta inscrição de times",
    date: "13/06",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
    imageUrl: image1,
    type: "noticia",
  },
  {
    id: "noticia-2",
    title: "Aberta inscrição de times",
    date: "13/06",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
    imageUrl: image2,
    type: "noticia",
  },
  {
    id: "noticia-3",
    title: "Aberta inscrição de times",
    date: "13/06",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
    imageUrl: image3,
    type: "noticia",
  },

  // Próximos eventos
  {
    id: "competicao-1",
    title: "Taça 13 Sunset",
    date: "13/06",
    imageUrl: image3,
    type: "competicao",
  },
  {
    id: "competicao-2",
    title: "Curso de arbitragem 5x5",
    date: "13/06",
    imageUrl: image2,
    type: "competicao",
  },
  {
    id: "competicao-3",
    title: "Tocantinense sub 15 e 17",
    date: "13/06",
    imageUrl: image1,
    type: "competicao",
  },
];
