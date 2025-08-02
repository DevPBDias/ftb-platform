import { Championship } from "@/types/new-competition";

export const GENDERS = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "misto", label: "Misto" },
];

export const CHAMPIONSHIPS_DATABASE: Championship[] = [
  { id: "1", name: "NBB - Novo Basquete Brasil" },
  { id: "2", name: "Campeonato Paulista de Basquete" },
  { id: "3", name: "Campeonato Carioca de Basquete" },
  { id: "4", name: "Liga de Desenvolvimento de Basquete (LDB)" },
  { id: "5", name: "Copa Super 8" },
  { id: "6", name: "Campeonato Brasileiro Interclubes" },
];

export const CATEGORIES = [
  { value: "sub-12", label: "Sub-12" },
  { value: "sub-15", label: "Sub-15" },
  { value: "sub-17", label: "Sub-17" },
  { value: "sub-20", label: "Sub-20" },
  { value: "adulto", label: "Adulto" },
  { value: "veterano", label: "Veterano" },
];

export const TIME_SLOTS = {
  morning: [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ],
  afternoon: [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ],
  evening: [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
  ],
};
