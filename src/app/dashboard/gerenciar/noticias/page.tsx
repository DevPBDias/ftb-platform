"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, Trophy } from "lucide-react";
import NewsManagement from "@/components/dashboard/NewsManagement";

export default function NoticiasPage() {
  const [activeTab, setActiveTab] = useState("noticias");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciamento de Conteúdo
        </h1>
        <p className="text-gray-600">
          Gerencie notícias e competições da federação
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="noticias" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Notícias
          </TabsTrigger>
          <TabsTrigger value="competicoes" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Competições
          </TabsTrigger>
        </TabsList>

        <TabsContent value="noticias" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Notícias da Federação
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NewsManagement activeTab="noticias" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competicoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Competições da Federação
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NewsManagement activeTab="competicoes" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 