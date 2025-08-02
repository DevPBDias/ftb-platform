"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, History, Award } from "lucide-react";
import { MemberFederation } from "@/types/cards.types";
import { HistoryType } from "@/constants/historyData";
import MembersManagement from "@/components/dashboard/MembersManagement";
import HistoryManagement from "@/components/dashboard/HistoryManagement";

export default function GerenciarPage() {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciamento
        </h1>
        <p className="text-gray-600">
          Gerencie membros, menções honrosas e histórias da federação
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Membros & Menções
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Histórias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Membros e Menções Honrosas
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MembersManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Histórias da Federação
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HistoryManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 