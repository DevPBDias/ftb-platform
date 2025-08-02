import { BookOpen, Bot, ClipboardList, Newspaper, Trophy, Settings } from "lucide-react";
import logoFTB from "@/assets/logo_ftb.png";

export const sidebarData = {
  teams: [
    {
      name: "Federação Tocantinense de Basketball",
      logo: logoFTB,
    },
  ],
  navMain: [
    {
      title: "Tabela de jogos",
      url: "/dashboard/tabela",
      icon: ClipboardList,
      isActive: true,
      items: [
        {
          title: "Próxima rodada",
          url: "/dashboard/tabela/rodada",
        },
        {
          title: "Registrar resultados",
          url: "/dashboard/tabela/registrar-jogo",
        },
        {
          title: "Resultados de partidas",
          url: "/dashboard/tabela/resultados",
        },
      ],
    },
    {
      title: "Gerenciamento",
      icon: Settings,
      items: [
          {
            title: "Membros e Histórias",
            url: "/dashboard/gerenciar/sobre",
          },
          {
            title: "Árbitros",
            url: "/dashboard/gerenciar/arbitros",
          },
          {
            title: "Notícias e Competições",
            url: "/dashboard/gerenciar/noticias",
          },
          {
            title: "Clubes e escolas",
            url: "/dashboard/gerenciar/clubes",
          },
      ],
    },
  ],
};
