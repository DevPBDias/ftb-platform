import gallery1 from "@/assets/gallery/campeonatos-2.png";
import gallery2 from "@/assets/gallery/campeonatos-3.png";
import gallery3 from "@/assets/gallery/mvp-2.png";
import gallery4 from "@/assets/gallery/ftb.png";
import gallery5 from "@/assets/gallery/social.png";
import { StaticImageData } from "next/image";

type GalleryData = {
  id: number;
  src: StaticImageData;
  alt: string;
  title: string;
  description: string;
  category: string;
};

export const galleryImages: GalleryData[] = [
  {
    id: 1,
    src: gallery1,
    alt: "Campeonato escolar de basketball",
    title: "Campeonato Escolar",
    description: "Jovens atletas em ação durante o campeonato escolar",
    category: "Competições",
  },
  {
    id: 2,
    src: gallery2,
    alt: "Ginásio poliesportivo durante jogo",
    title: "Ginásio Poliesportivo",
    description: "Estrutura moderna para grandes eventos esportivos",
    category: "Infraestrutura",
  },
  {
    id: 3,
    src: gallery3,
    alt: "Jovem atleta MVP",
    title: "Jovem Talento",
    description: "Destaque da nova geração do basquete tocantinense",
    category: "Atletas",
  },
  {
    id: 4,
    src: gallery4,
    alt: "Evento oficial da FTB",
    title: "Evento Oficial FTB",
    description: "Cerimônia de premiação e reconhecimento",
    category: "Eventos",
  },
  {
    id: 5,
    src: gallery5,
    alt: "Projeto social de basketball",
    title: "Projeto Social",
    description: "Inclusão através do esporte em comunidades",
    category: "Social",
  },
];
