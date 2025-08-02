"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, History, Award, Settings, Newspaper } from "lucide-react";

const Maindashboard = () => {
  return (
    <div className="w-full min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Gerencie todos os aspectos da Federação Tocantinense de Basquetebol
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tabela de Jogos */}
        <Link href="/dashboard/tabela">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Tabela de Jogos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Gerencie jogos, resultados e rodadas
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Equipes */}
        <Link href="/dashboard/equipes">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Equipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Gerencie inscrições e dados das equipes
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Notícias/Competições */}
        <Link href="/dashboard/noticia-competicao">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-orange-600" />
                Notícias & Competições
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Crie e edite notícias e competições
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Gerenciamento */}
        <Link href="/dashboard/gerenciar/sobre">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Gerenciamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Gerencie membros, árbitros e histórias da federação
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Árbitros */}
        <Link href="/dashboard/gerenciar/arbitros">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Árbitros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Gerencie os árbitros da federação
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Maindashboard;
