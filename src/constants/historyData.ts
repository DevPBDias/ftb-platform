import { StaticImageData } from "next/image";
import historyImg1 from "@/assets/free_throws.png";
import historyImg2 from "@/assets/free_throws.png";
import historyImg3 from "@/assets/free_throws.png";
import historyImg4 from "@/assets/free_throws.png";

export type HistoryType = {
  id: number;
  year: number;
  event?: string;
  description: string;
  image: StaticImageData;
};

export const historyData: HistoryType[] = [
  {
    id: 1,
    year: 2000,
    image: historyImg1,
    description:
      "A paixão pelo basquete sempre correu nas veias dos tocantinenses, mas por muitos anos, esse talento permaneceu espalhado em quadras de escolas e projetos sociais, sem a devida organização. Foi justamente a vontade de transformar essa realidade que, em 2010, um grupo de ex-atletas, técnicos e entusiastas decidiu se unir em um movimento histórico: a criação da Federação de Basquete do Tocantins (FBT).",
  },
  {
    id: 2,
    year: 2009,
    image: historyImg2,
    description:
      "A ideia nasceu em uma pequena reunião no ginásio Ayrton Senna, em Palmas, onde, entre bolas quicando e lembranças de grandes jogos, surgiu o compromisso de estruturar o basquete estadual. Homens e mulheres apaixonados pelo esporte, vindos de diversas cidades do Tocantins, deixaram de lado as diferenças e uniram forças por um sonho maior: fazer do basquete uma potência regional.",
  },
  {
    id: 3,
    year: 2015,
    image: historyImg3,
    description:
      "O processo não foi fácil. Foram meses de reuniões, debates e burocracias. Mas a persistência e o amor pelo esporte falaram mais alto. Em agosto daquele mesmo ano, a Federação foi oficialmente reconhecida, trazendo consigo a missão de organizar campeonatos, capacitar profissionais e criar oportunidades para jovens talentos que, até então, não tinham visibilidade.",
  },
  {
    id: 4,
    year: 2020,
    image: historyImg4,
    event: "Participação em competições nacionais",
    description:
      "Desde então, a FBT não parou de crescer. Com campeonatos estaduais, programas de base e parcerias educacionais, a federação se tornou o símbolo da transformação social e esportiva no Tocantins. Hoje, a FBT segue firme em seu propósito, mostrando que o basquete vai muito além das quadras — ele constrói sonhos, oportunidades e um futuro melhor para todo o estado.",
  },
];
