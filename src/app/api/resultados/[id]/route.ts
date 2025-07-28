import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { MatchData } from "@/types/match.type";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID da resultado é necessário." },
        { status: 400 }
      );
    }

    console.log(`Iniciando requisição GET para /api/resultados/${id}...`);

    const docRef = adminDB.collection("resultados").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      console.log(`resultado com ID ${id} não encontrada.`);
      return NextResponse.json(
        { message: "resultado não encontrada." },
        { status: 404 }
      );
    }

    const resultadoData = {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as MatchData;

    console.log(
      `resultado encontrada: ${JSON.stringify(resultadoData, null, 2)}`
    );

    return NextResponse.json(resultadoData, { status: 200 });
  } catch (error) {
    console.error(`Erro detalhado ao buscar resultado com ID na API:`, error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar resultado.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
