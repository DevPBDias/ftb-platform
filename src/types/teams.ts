import { StaticImageData } from "next/image";

export interface TeamData {
  id?: string;
  teamName: string;
  logo?: StaticImageData | string;
  admins?: {
    id: number;
    name: string;
    image: StaticImageData | string;
    role?: string;
  }[];
  image: StaticImageData | string;
  description: string;
  championships?: {
    id: number;
    name: string;
    years: number[];
    quantity: number;
    category: string;
  }[];
  contact?: string;
}
