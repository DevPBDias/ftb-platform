import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { TeamData } from "@/types/teams";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do clube é necessário." },
        { status: 400 }
      );
    }

    console.log(`Iniciando requisição GET para /api/clubes/${id}...`);

    const docRef = adminDB.collection("clubes").doc(id);
    const docSnapshot = await docRef.get();

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
