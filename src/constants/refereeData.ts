import { StaticImageData } from "next/image";
import error_img from "@/assets/error-image.png";
import joao_davi_img from "@/assets/arbitros/joao-davi.jpeg";
import victor_hugo_img from "@/assets/arbitros/victor-hugo.jpeg";

export type RefereeData = {
  id: number;
  name: string;
  experience: number;
  jobFunction?: string;
  image: StaticImageData;
};

export const refereeData: RefereeData[] = [
  {
    id: 1,
    name: "Paulo Bruno",
    experience: 1,
    jobFunction: "Júnior",
    image: error_img,
  },
  {
    id: 2,
    name: "João Davi",
    experience: 1,
    jobFunction: "Júnior",
    image: joao_davi_img,
  },
  {
    id: 3,
    name: "Victor Hugo",
    experience: 6,
    jobFunction: "Pleno",
    image: victor_hugo_img,
  },
  {
    id: 4,
    name: "Renata Reis",
    experience: 8,
    jobFunction: "Sênior",
    image: error_img,
  },
];
