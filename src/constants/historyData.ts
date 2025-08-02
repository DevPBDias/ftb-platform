import { StaticImageData } from "next/image";

export type HistoryType = {
  id: string;
  title?: string;
  year: number;
  event?: string;
  description: string;
  image: StaticImageData | string;
};

