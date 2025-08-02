import { StaticImageData } from "next/image";

export type MemberFederation = {
  id: string;
  name: string;
  jobFunction: string[];
  history: string;
  image: StaticImageData | string | undefined;
  category?: "member" | "mention"; // Adicionado para diferenciar
};

