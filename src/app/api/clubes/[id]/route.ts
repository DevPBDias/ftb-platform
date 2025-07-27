// src/app/api/clubes/[id]/route.ts
import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin"; // Use o Firebase Admin SDK

// Importe o tipo TeamData, se necessário para tipagem
import { TeamData } from "@/types/teams";

interface Params {
  id: string; // O ID do documento que virá da URL
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params; // Obtém o ID da URL

    if (!id) {
      return NextResponse.json(
        { message: "ID do clube é necessário." },
        { status: 400 }
      );
    }

    console.log(`Iniciando requisição GET para /api/clubes/${id}...`);

    const docRef = adminDB.collection("clubes").doc(id); // Referência a um documento específico
    const docSnapshot = await docRef.get(); // Obtém o documento

    if (!docSnapshot.exists) {
      console.log(`Clube com ID ${id} não encontrado.`);
      return NextResponse.json(
        { message: "Clube não encontrado." },
        { status: 404 }
      );
    }

    const teamData = { id: docSnapshot.id, ...docSnapshot.data() } as TeamData;

    console.log(`Clube encontrado: ${JSON.stringify(teamData, null, 2)}`);

    return NextResponse.json(teamData, { status: 200 });
  } catch (error) {
    console.error(`Erro detalhado ao buscar clube com ID na API:`, error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar clube.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
