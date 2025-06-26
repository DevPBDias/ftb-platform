import { StaticImageData } from "next/image";
import member1 from "@/assets/member1.png";
import member2 from "@/assets/member2.png";
import member3 from "@/assets/member3.png";

export type MemberFederation = {
  name: string;
  jobFuntion: string;
  secondaryJobFunction?: string;
  history: string;
  image: StaticImageData;
};

export const members: MemberFederation[] = [
  {
    name: "Marcos Silva",
    jobFuntion: "Presidente da Federação de Basquete do Tocantins (FBT)",
    secondaryJobFunction: "Coordenador de Projetos Sociais",
    image: member1,
    history:
      "Marcos Silva, de 52 anos, é natural de Palmas e tem uma vida inteira dedicada ao basquete. Ex-jogador profissional da década de 90, Marcos representou o Tocantins em competições nacionais e internacionais. Após encerrar a carreira nas quadras, se formou em Educação Física e passou a trabalhar com projetos sociais ligados ao esporte. Sua paixão pelo basquete e visão de inclusão social o levaram a assumir a presidência da FBT, onde tem como missão democratizar o acesso ao esporte e fortalecer as categorias de base.",
  },
  {
    name: "Fernanda Rocha",
    jobFuntion: "Vice-Presidente",
    image: member2,
    history:
      "Fernanda Rocha, 44 anos, é advogada e ex-jogadora universitária de basquete. Ela começou no esporte ainda criança, influenciada pelo pai, que era técnico de times escolares. Apesar de seguir carreira jurídica, Fernanda sempre esteve envolvida nos bastidores do esporte, atuando como coordenadora de eventos e conselheira jurídica de diversas competições estaduais. Como vice-presidente, ela é responsável por toda a parte administrativa e legal da federação, além de liderar projetos de incentivo ao esporte feminino.",
  },
  {
    name: "Rafael Costa",
    jobFuntion: "Diretor Técnico",
    image: member3,
    history:
      "Rafael Costa, 39 anos, é técnico de basquete e ex-atleta. Nascido em Araguaína, Rafael iniciou no esporte em escolinhas públicas e se destacou pelo talento e dedicação. Jogou por clubes regionais e, após se especializar em Treinamento Esportivo, dedicou-se à formação de novos talentos. Como Diretor Técnico da FBT, Rafael coordena o planejamento das competições estaduais, capacitação de técnicos e o desenvolvimento dos atletas de base, com foco em transformar o Tocantins em referência nacional no basquete.",
  },
];
