"use client";

import Navbar from "@/components/Hero/Navbar";
import bg_teams from "@/assets/bg_teams.png";
import teamPhoto from "@/assets/free_throws.png";
import trophy from "@/assets/trophy.png";
import userImg from "@/assets/error-image.png";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import {
  Instagram,
  ArrowLeft,
  Trophy,
  Users,
  Calendar,
  MapPin,
  Star,
  Award,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import LoadingThreeDotsJumping from "@/components/loading/LoadingBalls";
import { useFetchById } from "@/hooks/useFecthById";
import { TeamData } from "@/types/teams";
import ModernNavbar from "@/components/Hero/Navbar";

export default function ClubeDetailPage() {
  const route = useRouter();
  const params = useParams();
  const clubeId = params.id as string;
  const {
    data: team,
    loading,
    error,
  } = useFetchById<TeamData>("clubes", clubeId);

  if (loading) return <LoadingThreeDotsJumping />;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!team) return <p>Árbitro não encontrado.</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="relative min-h-screen overflow-hidden">
        <ModernNavbar />
        <div className="absolute inset-0">
          <Image
            src={bg_teams}
            alt="Basketball court background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#162456]/40 via-[#162456]/20 to-blue-900/60" />
        </div>

        {/* Navigation */}
        <motion.nav
          className="relative p-6 2xl:absolute z-20 2xl:top-32 2xl:left-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => route.push("/clubes")}
            className="cursor-pointer group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Voltar para clubes</span>
          </button>
        </motion.nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            {/* Team Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Team Header */}
              <div className="flex items-center gap-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <Image
                      src={team.logo || "/placeholder.svg"}
                      alt={`Logo ${team.teamName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star size={16} className="text-black" />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-2">
                    {team.teamName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Fundado em {team.founded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{team.location ?? "Localização desconhecida"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Jogadores",
                    value: team.stats?.players ?? 0,
                    icon: Users,
                  },
                  {
                    label: "Vitórias",
                    value: team.stats?.victories ?? 0,
                    icon: Trophy,
                  },
                  {
                    label: "Anos",
                    value: team.stats?.founded ?? team.founded ?? "N/A",
                    icon: Award,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <stat.icon
                      size={24}
                      className="text-yellow-400 mx-auto mb-2"
                    />
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Championship Badge */}
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-black"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <Trophy size={32} />
                  <div>
                    <h3 className="text-xl font-bold">Campeão Tocantinense</h3>
                    <p className="text-black/80">Temporada 2024</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Team Photo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={team.image || "/placeholder.svg"}
                  alt="Team photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#162456] to-blue-600 rounded-xl flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#162456]">
                      {team.stats?.players ?? 0}
                    </div>
                    <div className="text-sm text-slate-600">Atletas</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#162456] mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#162456] to-blue-600 rounded-full" />
                  Sobre o Time
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {team.description}
                </p>
              </motion.div>

              {/* Championships */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#162456] mb-8 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                  Conquistas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.championships?.map((championship, index) => (
                    <motion.div
                      key={index}
                      className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#162456] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Trophy size={24} className="text-white" />
                        </div>
                        <div className="text-3xl font-bold text-[#162456] mb-2">
                          {championship.quantity}
                        </div>
                        <div className="font-semibold text-slate-800 mb-1">
                          {championship.name}
                        </div>
                        <div className="text-sm text-slate-600">
                          {championship.category}
                        </div>
                        <div className="text-xs text-slate-500 mt-2">
                          {championship.years?.join(", ") ?? ""}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Staff */}
              <motion.div
                className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-lg border border-slate-200/50"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-[#162456] mb-6 flex items-center gap-2">
                  <Users size={24} />
                  Comissão Técnica
                </h3>
                <div className="space-y-6">
                  {team.admins?.map((admin, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200">
                          <Image
                            src={
                              admin.image === "error_img"
                                ? userImg
                                : admin.image || "/placeholder.svg"
                            }
                            alt={admin.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">
                          {admin.name}
                        </h4>
                        <p className="text-sm text-slate-600">{admin.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                className="bg-gradient-to-br from-[#162456] to-blue-600 rounded-3xl p-8 text-white shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Phone size={24} />
                  Contato
                </h3>
                <div className="space-y-4">
                  <Link
                    href={team.contact || "#"}
                    target="_blank"
                    className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 hover:scale-105"
                  >
                    <Instagram size={20} />
                    <span className="font-medium">Instagram</span>
                    <ExternalLink
                      size={16}
                      className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
