import { StaticImageData } from "next/image";
import team_jaguarz from "@/assets/clubes/jaguarz/jaguarz-team.jpg";
import team_aceb from "@/assets/clubes/aceb/aceb-team.jpg";
import team_anne from "@/assets/clubes/anne-frank/anne-team.jpg";
import team_marista from "@/assets/clubes/marista/marista-team.jpg";
import team_aabp from "@/assets/clubes/aabp/aabp-team.jpg";
import team_cidadao from "@/assets/clubes/cidadao/cidadao-team.jpg";
import team_josimo from "@/assets/clubes/josimo/josimo-team.jpg";
import team_porto from "@/assets/clubes/porto/abp-porto-team.jpg";
import team_tios from "@/assets/clubes/tios/tios-team.jpg";
import logo_jaguarz from "@/assets/clubes/jaguarz/jaguarz.jpg";
import logo_aceb from "@/assets/clubes/aceb/aceb.jpg";
import logo_anne from "@/assets/clubes/anne-frank/anne-frank.jpg";
import logo_marista from "@/assets/clubes/marista/marista.jpg";
import logo_aabp from "@/assets/clubes/aabp/aabp.jpg";
import logo_cidadao from "@/assets/clubes/cidadao/cidadao.jpg";
import logo_josimo from "@/assets/clubes/josimo/josimo.jpg";
import logo_porto from "@/assets/clubes/porto/abp-porto.jpg";
import error_img from "@/assets/error-image.png";

export type TeamData = {
  logo?: StaticImageData | string;
  id: number;
  teamName: string;
  admins: {
    id: number;
    name: string;
    image: StaticImageData;
    role?: string;
  }[];
  image: StaticImageData;
  description: string;
  championships?: {
    id: number;
    name: string;
    years: number[];
    quantity: number;
    category: string;
  }[];
  contact?: string;
};

export const teamsData: TeamData[] = [
  {
    id: 1,
    logo: logo_jaguarz,
    teamName: "Jaguarz",
    admins: [
      {
        id: 1,
        name: "Luiz Neto",
        image: error_img,
        role: "Técnico",
      },
      {
        id: 2,
        name: "Caio",
        image: error_img,
        role: "Técnico",
      },
      {
        id: 3,
        name: "Paulo Paiva",
        image: error_img,
        role: "Coordenador Técnico",
      },
    ],
    image: team_jaguarz,
    description:
      "O Jaguarz é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o Jaguarz busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o Jaguarz oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O Jaguarz não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/pmwjaguars/",
  },
  {
    id: 2,
    logo: logo_aceb,
    teamName: "ACEB",
    admins: [
      {
        id: 1,
        name: "Paulo Henrique",
        image: error_img,
        role: "Técnico",
      },
      {
        id: 2,
        name: "Lédson",
        image: error_img,
        role: "Técnico",
      },
    ],
    image: team_aceb,
    description:
      "O ACEB é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o ACEB busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o ACEB oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O ACEB não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/atb_aceb/",
  },
  {
    id: 3,
    logo: logo_anne,
    teamName: "Anne Frank",
    admins: [
      {
        id: 1,
        name: "Roberto Ferreira",
        image: error_img,
        role: "Técnico",
      },
    ],
    image: team_anne,
    description:
      "O Anne Frank é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o Anne Frank busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o Anne Frank oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O Anne Frank não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/atb_aceb/",
  },
  {
    id: 4,
    logo: logo_marista,
    teamName: "Colégio Marista",
    admins: [
      {
        id: 1,
        name: "Paulo Paiva",
        image: error_img,
        role: "Técnico",
      },
    ],
    image: team_marista,
    description:
      "O Marista é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o Marista busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o Marista oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O Marista não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/maristatocantins/",
  },
  {
    id: 5,
    logo: logo_aabp,
    teamName: "AABP",
    admins: [
      {
        id: 1,
        name: "Regis",
        image: error_img,
        role: "Técnico",
      },
      {
        id: 2,
        name: "Adriano",
        image: error_img,
        role: "Técnico",
      },
      {
        id: 3,
        name: "Larissa",
        image: error_img,
        role: "Assitente Técnica",
      },
    ],
    image: team_aabp,
    description:
      "O AABP é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o AABP busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o AABP oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O AABP não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/aabpalmas/",
  },
  {
    id: 6,
    logo: logo_cidadao,
    teamName: "Basquete Cidadão",
    admins: [
      {
        id: 1,
        name: "Paulo Paiva",
        image: error_img,
        role: "Técnico",
      },
      {
        id: 2,
        name: "Claúdio",
        image: error_img,
        role: "Técnico",
      },
    ],
    image: team_cidadao,
    description:
      "O Cidadão é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o Cidadão busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o Cidadão oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O Cidadão não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/basquetecidadao/",
  },
  {
    id: 7,
    logo: logo_josimo,
    teamName: "Colégio Padre Josimo",
    admins: [
      {
        id: 1,
        name: "Marley",
        image: error_img,
        role: "Técnico",
      },
    ],
    image: team_josimo,
    description:
      "O Josimo é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o Josimo busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o Josimo oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O Josimo não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/escpadrejosimo/",
  },
  {
    id: 8,
    logo: logo_porto,
    teamName: "ABP Porto",
    admins: [
      {
        id: 1,
        name: "A definir",
        image: error_img,
        role: "Técnico",
      },
    ],
    image: team_porto,
    description:
      "O ABP Porto é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o ABP Porto busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o ABP Porto oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O ABP Porto não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Sub-15",
      },
      {
        id: 2,
        name: "JETS",
        years: [2020, 2023],
        quantity: 3,
        category: "Sub-17",
      },
      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Sub-18",
      },
    ],
    contact: "https://www.instagram.com/apb_porto/",
  },
  {
    id: 9,
    logo: "TIOS",
    teamName: "TIOS",
    admins: [
      {
        id: 1,
        name: "Murilo",
        image: error_img,
        role: "Técnico",
      },
      {
        id: 2,
        name: "Alquimar",
        image: error_img,
        role: "Assistente Técnico",
      },

      {
        id: 3,
        name: "Yuri",
        image: error_img,
        role: "Assitente Técnico",
      },
    ],
    image: team_tios,
    description:
      "O TIOS é um clube de basquete que se destaca por sua paixão pelo esporte e compromisso com a excelência. Com uma equipe talentosa e dedicada, o TIOS busca constantemente superar desafios e conquistar vitórias em quadra. Fundado com o objetivo de promover o basquete em sua comunidade, o TIOS oferece treinamento de alta qualidade, desenvolvimento de habilidades e oportunidades para jovens atletas. A equipe é conhecida por seu espírito esportivo, trabalho em equipe e determinação em alcançar o sucesso. O TIOS não é apenas um clube de basquete, mas uma família unida pelo amor ao jogo. Com uma base sólida de torcedores apaixonados, o clube busca inspirar e motivar a próxima geração de jogadores.",
    championships: [
      {
        id: 1,
        name: "Campeonato Tocantinense",
        years: [2020, 2025],
        quantity: 4,
        category: "Adulto",
      },

      {
        id: 3,
        name: "Campeonato 3x3",
        years: [2021, 2024],
        quantity: 7,
        category: "Adulto",
      },
    ],
    contact: "https://www.instagram.com/p/C0zaWJiP-oa/",
  },
];
