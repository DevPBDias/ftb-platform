import { StaticImageData } from "next/image";
import ceciImg from "@/assets/about/ceci.png";
import carlosImg from "@/assets/about/carlos.png";
import muriloImg from "@/assets/about/murilo.png";
import rafaelImg from "@/assets/about/sulino.png";

export type MemberFederation = {
  name: string;
  jobFuntion: string[];
  history: string;
  image: StaticImageData;
};

export const members: MemberFederation[] = [
  {
    name: "Maria Cecília",
    jobFuntion: [
      "👑 Presidente da Federação",
      "🏅 Coordenadora de Arbitragem do Estado do Tocantins",
      "🌟 Árbitra Nacional",
    ],
    image: ceciImg,
    history:
      "Maria Cecília faz história como a primeira mulher a assumir a presidência da Federação Intercontinental de Basquete, representando um novo tempo para o esporte com liderança, seriedade e visão de futuro. Com ampla experiência na arbitragem de competições nacionais e profundo conhecimento da realidade esportiva do Tocantins, ela acompanha de perto o desenvolvimento do basquete em todo o estado, sendo uma referência dentro e fora das quadras. Seu trabalho une responsabilidade técnica, valorização das categorias de base e compromisso com a inclusão e o crescimento do basquete tocantinense.",
  },
  {
    name: "Murilo Klebis",
    jobFuntion: [
      "🏀 Vice-Presidente atual da Federação",
      "🏅 Ex-Presidente da Federação",
      "🌱 Fundador do time Tios",
    ],
    image: muriloImg,
    history:
      "Murilo Andrade é um nome de peso no cenário do basquete tocantinense. Ex-presidente da Federação Tocantinense de Basquete, ele retorna à liderança agora como vice-presidente da Federação Intercontinental, trazendo sua experiência e amor pelo esporte. Além da atuação na gestão, Murilo também vive o basquete na prática, sendo atleta da equipe 'Tios' e incentivando o crescimento da modalidade em todas as frentes, da base ao alto rendimento. Com sua trajetória dentro e fora das quadras, ele fortalece a missão da Federação de promover o basquete com seriedade, paixão e presença ativa na comunidade esportiva.",
  },
  {
    name: "Carlos",
    jobFuntion: [
      "🏀 Vice-Presidente da Federação",
      "🏅 Ex-Árbitro",
      "🛠️ Integrante de gestão anterior",
    ],
    image: carlosImg,
    history:
      "Carlos Silva soma sua vivência e dedicação ao basquete tocantinense como vice-presidente da Federação, contribuindo ativamente para a construção de uma gestão sólida e comprometida com o desenvolvimento do esporte. Com experiência como árbitro estadual e participação na gestão do ex-presidente Rafael Solino, Carlos traz um olhar atento, técnico e estratégico para os desafios e oportunidades do basquete em nosso estado. Seu trabalho reforça a continuidade de um projeto sério e colaborativo, sempre em busca de melhorias para atletas, árbitros e toda a comunidade do basquete tocantinense.",
  },
];

export const mentions = [
  {
    name: "Rafael Sulino",
    jobFuntion: [
      "🏀 Ex-Presidente da Federação Tocantinense de Basquete",
      "🌟 Referência na Transformação do Basquete Tocantinense",
    ],
    image: rafaelImg,
    history:
      "Rafael Solino foi um dos grandes nomes à frente da Federação Tocantinense de Basquete, sendo responsável por iniciar uma verdadeira transformação na gestão, estrutura e visibilidade da modalidade no estado. Durante seu longo período como presidente, liderou diversos projetos sociais, ampliou o acesso ao basquete e fortaleceu as bases da federação com seriedade, inovação e compromisso com o desenvolvimento esportivo. Sua dedicação e visão o tornaram uma referência para toda a comunidade do basquete tocantinense, deixando um legado que continua inspirando atletas, árbitros, dirigentes e apaixonados pelo esporte.",
  },
];
