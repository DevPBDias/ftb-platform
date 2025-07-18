import { StaticImageData } from "next/image";
import sede from "@/assets/about/sede.png";
import reuniao from "@/assets/about/votacao-2017.png";
import votacao from "@/assets/about/votacao-2024.png";
import treinos from "@/assets/about/treinamentos.png";

export type HistoryType = {
  id: number;
  title?: string;
  year: number;
  event?: string;
  description: string;
  image: StaticImageData;
};

export const historyData: HistoryType[] = [
  {
    id: 1,
    title: "Uma Reunião Histórica para o Basquete Tocantinense",
    year: 2015,
    image: reuniao,
    description:
      "Em 6 de março de 2015, um encontro marcante reuniu atletas, professores, árbitros e entusiastas do basquete para lutar por melhorias no esporte em Tocantins. Essa reunião histórica pavimentou o caminho para mudanças significativas. Dois anos depois, em 17 de maio de 2017, Rafael Sulino assumiu a presidência da Federação Tocantinense de Basquetebol, com um mandato que se estendeu até 2021.",
  },
  {
    id: 2,
    title:
      "Federação Tocantinense de Basquetebol Inaugura Nova Sede Administrativa",
    year: 2018,
    image: sede,
    description:
      "O basquete tocantinense agora tem casa própria! A Federação Tocantinense de Basquetebol (FTB) celebrou a inauguração de sua nova sede administrativa. A conquista foi possível graças à permissão de uso por 10 anos de um quiosque na quadra 108 Sul, em Palmas. A permissão, concedida pelo Secretário Municipal de Desenvolvimento Econômico de Palmas, Kariello Coelho, não só abrigará a administração da FTB, mas também servirá de base para o projeto social Arremesso Campeão. Há três anos em atividade, o projeto já atende cerca de 200 crianças e jovens, oferecendo acesso ao esporte e oportunidades de desenvolvimento. A FTB expressa um agradecimento especial ao Secretário Kariello Coelho e ao Instituto Social Saúde Premier, parceiros fundamentais para o crescimento e sucesso do basquete no Tocantins.",
  },
  {
    id: 3,
    title: "Capacitação em Arbitragem de Basquete 3x3",
    year: 2023,
    image: treinos,
    description:
      "O primeiro passo para um ano de grandes eventos foi dado! A Federação Tocantinense de Basquetebol realizou com sucesso o Curso de Arbitragem em Basquete 3x3. A Federação agradece imensamente a Maria Cecília pelo excelente trabalho na formação de novos árbitros e na atualização dos profissionais já atuantes. Um agradecimento especial também à Ulbra Palmas pelo apoio na realização do curso, com a disponibilização de seu Complexo Esportivo e a divulgação",
  },
  {
    id: 4,
    year: 2024,
    title: "Liderança feminina na Federação Tocantinense de Basquetebol",
    image: votacao,
    event: "Participação em competições nacionais",
    description:
      "Em um movimento histórico, Maria Cecília Nunes Oliveira foi eleita presidente da Federação Tocantinense de Basquetebol na terça-feira, 20 de agosto de 2024. A assembleia extraordinária ocorreu após a renúncia do então presidente Ricardo Papa. Maria Cecília cumprirá mandato até 15 de maio de 2025. Esta eleição marca um marco significativo, pois Maria Cecília é a primeira mulher a ocupar o cargo de presidente na Federação. Sua eleição reforça o compromisso de promover um ambiente inclusivo e democrático dentro do esporte, garantindo que ele seja acessível e acolhedor para todos.",
  },
];
