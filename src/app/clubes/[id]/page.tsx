"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Hero/Navbar";
import bg_teams from "@/assets/bg_teams.png";
import teamPhoto from "@/assets/free_throws.png";
import trophy from "@/assets/trophy.png";
import userImg from "@/assets/error-image.png";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Instagram } from "lucide-react";
import LoadingThreeDotsJumping from "@/app/loading";
import { useFetchById } from "@/hooks/useFecthById";
import { TeamData } from "@/types/teams";

export default function ClubeDetailPage() {
  const route = useRouter();
  const params = useParams();
  const clubeId = params.id as string;
  const {
    data: clube,
    loading,
    error,
  } = useFetchById<TeamData>("clubes", clubeId);

  if (loading) return <LoadingThreeDotsJumping />;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!clube) return <p>Árbitro não encontrado.</p>;

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className="relative w-full lg:h-[100dvh] flex flex-col items-center justify-center">
        <picture className="w-full h-full ">
          <Image
            src={bg_teams}
            alt="Image of a player holding a basketball in the middle of a park"
            className="w-full h-full object-cover"
            priority
          />
        </picture>
        <Navbar />
        <motion.div
          className="absolute top-0 left-0 w-full flex flex-col items-start justify-center px-4 2xl:px-48 text-white gap-10 mt-40 bg-blue-950 2xl:bg-transparent py-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <div className="flex flex-col xl:flex-row items-start justify-between w-full gap-4 text-white">
            <div className="flex flex-row-reverse items-center justify-center gap-6">
              <h1 className="lg:text-5xl text-xl md:text-3xl">
                {clube?.teamName}
              </h1>
              {clube?.logo && typeof clube.logo === "string" ? (
                <picture className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg bg-amber-500 hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src={clube.logo}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-lg"
                    width={128}
                    height={128}
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/128x128/cccccc/333333?text=Logo`;
                    }}
                  />
                </picture>
              ) : clube?.logo ? (
                <picture className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg bg-amber-500 hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src={clube.logo}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </picture>
              ) : (
                <p className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg flex items-center justify-center uppercase text-red-500 font-bold text-5xl border-2 border-white transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-white">
                  Sem Logo
                </p>
              )}
            </div>
            <div className="flex flex-row flex-wrap items-start md:items-center justify-between gap-4">
              {clube?.admins?.map((avatar, index) => (
                <div
                  key={index}
                  className="flex flex-row lg:flex-col items-center lg:items-start justify-center gap-2"
                >
                  <picture className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg bg-amber-500 hover:scale-105 transition-transform duration-300 ease-in-out">
                    {avatar.image === "error_img" || "" ? (
                      <Image
                        src={userImg}
                        alt="Coach"
                        className="w-full h-full object-cover rounded-lg"
                        width={128}
                        height={128}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/128x128/cccccc/333333?text=Admin`;
                        }}
                      />
                    ) : (
                      <Image
                        src={avatar.image}
                        alt="Coach"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </picture>
                  <p className="text-xs">{avatar.name}</p>
                  <p className="text-xs">{avatar.role}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center justify-center w-full md:w-fit 2xl:w-80 gap-3 bg-white p-6 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <picture className=" w-16 h-16 lg:w-24 lg:h-24 rounded-lg bg-amber-500">
                <Image
                  src={trophy}
                  alt="Trophy"
                  className="w-full h-full object-cover"
                />
              </picture>
              <p className="uppercase text-sm lg:text-lg w-full lg:w-32 font-bold text-blue-950">
                Campeão Tocantinense 2025
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full items-start justify-between gap-4 text-white">
            <picture className="w-[300px] h-[300px] md:w-[600px] md:h-[400px] rounded-lg">
              {typeof clube?.image === "string" ? (
                <Image
                  src={clube.image}
                  alt="Team photo"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                  width={600}
                  height={400}
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x400/cccccc/333333?text=Foto+Time`;
                  }}
                />
              ) : (
                <Image
                  src={clube?.image || teamPhoto}
                  alt="Team photo"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              )}
            </picture>
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-9">
              <p className="w-full text-sm md:text-base font-normal text-justify">
                {clube?.description}
              </p>
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6 font-bold">
                {clube?.championships?.map((tournament, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-2 border-2 border-white px-2 py-4 rounded-lg bg-blue-950/90"
                  >
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-center w-full">
                      {tournament.quantity}
                    </p>
                    <p className="text-base text-center w-full font-medium text-gray-300">
                      {tournament.name}
                    </p>
                    <p className="text-sm text-center w-full font-medium text-gray-300">
                      {tournament.category}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row items-center justify-between gap-4 w-full">
                <Link
                  href={clube?.contact || ""}
                  target="_blank"
                  className="hover:scale-110 cursor-pointer transition duration-200 flex items-center justify-center gap-2 p-2 border border-white rounded-lg"
                >
                  <Instagram size={20} color="white" />
                  <span className="md:inline-block text-white font-bold">
                    Instagram
                  </span>
                </Link>
                <button
                  onClick={() => route.push(`/clubes`)}
                  className="flex items-center justify-center text-sm md:text-base gap-3 px-6 py-3 bg-transparent border border-white text-white rounded-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-bold"
                >
                  Voltar para clubes
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
