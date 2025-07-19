"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Hero/Navbar";
import bg_teams from "@/assets/bg_teams.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingThreeDotsJumping from "../../components/loading/LoadingBalls";
import { useFetch } from "@/hooks/useFetch";
import { TeamData } from "@/types/teams";

const Teams = () => {
  const route = useRouter();
  const { data: clubes, loading, error } = useFetch<TeamData[]>("/api/clubes");

  if (loading) return <LoadingThreeDotsJumping />;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!clubes || clubes.length === 0)
    return <p className="text-white">Nenhum clube encontrado.</p>;

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
          className="absolute top-0 left-0 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-24 px-[5%] lg:px-[10%] 2xl:px-[15%]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1 className="text-white text-2xl md:text-4xl 2xl:text-5xl font-bold w-full md:w-3/5 text-center lg:w-1/2 lg:text-left 2xl:w-2/5 uppercase tracking-wider">
            Conheça os times que arrasam em nossas quadras
          </h1>
          <div className="grid grid-cols-3 gap-3 md:gap-6 items-center justify-center">
            {clubes?.map((team) => (
              <>
                {team.logo === "TIOS" ? (
                  <p
                    key={team.id}
                    onClick={() => route.push(`/clubes/${team.id}`)}
                    className="cursor-pointer w-20 h-20 md:w-32 md:h-32 rounded-lg flex items-center justify-center uppercase text-red-500 font-bold text-5xl border-2 border-white transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-white"
                  >
                    {team.logo}
                  </p>
                ) : (
                  <picture
                    key={team.id}
                    className="cursor-pointer w-20 h-20 md:w-32 md:h-32 rounded-lg border-2 border-white transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-amber-500"
                    onClick={() => route.push(`/clubes/${team.id}`)}
                  >
                    <Image
                      width={100}
                      height={100}
                      priority
                      src={team.logo || ""}
                      alt={`Team logo ${team.teamName}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </picture>
                )}
              </>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Teams;
