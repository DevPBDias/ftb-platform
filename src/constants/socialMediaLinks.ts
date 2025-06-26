import { File, Instagram, User } from "lucide-react";
import { StaticImageData } from "next/image";
import logoPartner from "@/assets/logo_gov.png";

export interface ISocialMedia {
  id: number;
  name: string;
  link: string;
  icon: React.ComponentType<{
    color: string;
    size: number;
  }>;
}

export const socialMedia: ISocialMedia[] = [
  {
    id: 1,
    name: "Instagram",
    link: "https://www.instagram.com/basquetetocantins/",
    icon: Instagram,
  },
  {
    id: 2,
    name: "Linktree",
    link: "https://linktr.ee/FederacaoToBasketball",
    icon: File,
  },
  {
    id: 3,
    name: "Login",
    link: "/login",
    icon: User,
  },
];

export interface IPartnersLogo {
  id: number;
  logoPartner: StaticImageData;
}

export const partnersLogo: IPartnersLogo[] = [
  {
    id: 1,
    logoPartner: logoPartner,
  },
  {
    id: 2,
    logoPartner: logoPartner,
  },
  {
    id: 3,
    logoPartner: logoPartner,
  },
];
