import {
  BookOpen,
  Bot,
  ClipboardList,
  Frame,
  Map,
  Newspaper,
  Trophy,
  Settings2,
} from "lucide-react";
import logoFTB from "@/assets/logo_ftb.png";
import user from "@/assets/error-image.png";

export const sidebarData = {
  user: {
    name: "User",
    email: "m@example.com",
    avatar: user,
  },
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
          title: "Resultados de partidas",
          url: "/dashboard/tabela/resultados",
        },
        {
          title: "Próxima rodada",
          url: "/dashboard/tabela/rodada",
        },
        {
          title: "Registrar resultados",
          url: "/dashboard/tabela/registrar-jogo",
        },
      ],
    },
    {
      title: "Equipes",
      url: "/dashboard/equipes",
      icon: Bot,
      items: [
        {
          title: "Inscrições",
          url: "/dashboard/equipes/inscricoes",
        },
        {
          title: "Dados",
          url: "/dashboard/equipes/dados",
        },
      ],
    },
    {
      title: "Notícias",
      url: "/dashboard/noticia",
      icon: Newspaper,
    },
    {
      title: "Competições",
      url: "/dashboard/competicao",
      icon: Trophy,
    },
    {
      title: "História FTB",
      url: "/dashboard/historia",
      icon: BookOpen,
    },
  ],
};
