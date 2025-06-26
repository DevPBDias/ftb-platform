"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Hero/Navbar";
import bg_teams from "@/assets/bg_teams.png";
import teamA from "@/assets/teamA.png";
import teamPhoto from "@/assets/free_throws.png";
import avatar1 from "@/assets/avatar1.png";
import avatar2 from "@/assets/avatar2.png";
import avatar3 from "@/assets/avatar3.png";
import avatar4 from "@/assets/avatar4.png";
import trophy from "@/assets/trophy.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { use } from "react";

const AVATARS = [avatar1, avatar2, avatar3, avatar4];

export default function TeamPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = use(params);
  const route = useRouter();

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center">
        <picture className="w-full h-full">
          <Image
            src={bg_teams}
            alt="Image of a player holding a basketball in the middle of a park"
            className="w-full h-full object-cover"
          />
        </picture>
        <Navbar />
        <motion.div
          className="absolute top-0 left-0 w-full flex flex-col items-start justify-center px-48 text-white gap-10 mt-40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1 className="text-5xl">Jaguarz</h1>
          <div className="flex flex-row items-start justify-between w-full gap-4 text-white">
            <picture className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-amber-500 hover:scale-105 transition-transform duration-300 ease-in-out">
              <Image
                src={teamA}
                alt="Image of a player holding a basketball in the middle of a park"
                className="w-full h-full object-cover"
              />
            </picture>
            <div className="flex flex-row items-start md:items-center justify-between gap-4">
              {AVATARS.map((avatar, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-center gap-2"
                >
                  <picture className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-amber-500 hover:scale-105 transition-transform duration-300 ease-in-out">
                    <Image
                      src={avatar}
                      alt="Image of a player holding a basketball in the middle of a park"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                  <p>Nome da pessoa</p>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center justify-center gap-3 bg-white p-6 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <picture className="w-24 h-24 md:w-28  rounded-lg bg-amber-500">
                <Image
                  src={trophy}
                  alt="Image of a player holding a basketball in the middle of a park"
                  className="w-full h-full object-cover"
                />
              </picture>
              <p className="uppercase text-lg w-32 font-bold text-blue-950">
                Campeão Tocantinense 2025
              </p>
            </div>
          </div>
          <div className="flex flex-row w-full items-center justify-between gap-4 text-white">
            <picture className="w-[300px] h-[300px] md:w-[600px] md:h-[400px] rounded-lg">
              <Image
                src={teamPhoto}
                alt="Image of a player holding a basketball in the middle of a park"
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </picture>
            <div className="w-1/2 flex flex-col items-start justify-center gap-9">
              <p className="w-full text-base font-normal">
                O Jaguarz é um clube de basquete que se destaca por sua paixão
                pelo esporte e compromisso com a excelência. Com uma equipe
                talentosa e dedicada, o Jaguarz busca constantemente superar
                desafios e conquistar vitórias em quadra. Fundado com o objetivo
                de promover o basquete em sua comunidade, o Jaguarz oferece
                treinamento de alta qualidade, desenvolvimento de habilidades e
                oportunidades para jovens atletas. A equipe é conhecida por seu
                espírito esportivo, trabalho em equipe e determinação em
                alcançar o sucesso. O Jaguarz não é apenas um clube de basquete,
                mas uma família unida pelo amor ao jogo. Com uma base sólida de
                torcedores apaixonados, o clube busca inspirar e motivar a
                próxima geração de jogadores.
              </p>
              <div className="w-full grid grid-cols-3 items-center justify-center gap-12 font-bold">
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-white px-2 py-4 rounded-lg bg-blue-950/90">
                  <p className="text-2xl">+15</p>
                  <p className="w-32 text-center">Campeonato Tocantinense</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-white px-2 py-4 rounded-lg bg-blue-950/90">
                  <p className="text-2xl">+15</p>
                  <p className="w-32 text-center">Campeonato Tocantinense</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-white px-2 py-4 rounded-lg bg-blue-950/90">
                  <p className="text-2xl">+15</p>
                  <p className="w-32 text-center">Campeonato Tocantinense</p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-end gap-4 w-full">
                <button
                  onClick={() => route.push(`/clubes`)}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-transparent border border-white text-white rounded-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-bold"
                >
                  <ArrowLeftCircle size={18} color="white" />
                  Voltar para clubes
                </button>
                <button
                  onClick={() => route.push(`/clubes/${Number(team) + 1}`)}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-700 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-bold"
                >
                  Próximo time
                  <ArrowRightCircle size={18} color="black" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
