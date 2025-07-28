import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { MatchData } from "@/types/match.type";

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/resultados...");

    const resultadosCollectionRef = adminDB.collection("resultados");

    console.log(
      "Tentando buscar documentos da coleção 'resultados' no Firestore (Admin SDK)..."
    );
    const snapshot = await resultadosCollectionRef
      .orderBy("date", "asc")
      .orderBy("time", "asc")
      .get();

    const resultados: MatchData[] = [];
    snapshot.forEach((doc) => {
      resultados.push({ id: doc.id, ...(doc.data() as MatchData) });
    });

    console.log(`Número de resultados encontradas: ${resultados.length}`);
    console.log("resultados encontradas:", JSON.stringify(resultados, null, 2));

    return NextResponse.json(resultados, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar resultados na API (GET):", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar resultados.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: MatchData = await request.json();

    console.log(
      "Recebendo requisição POST para /api/resultados com dados:",
      JSON.stringify(data, null, 2)
    );

    const docRef = await adminDB.collection("resultados").add(data);

    console.log(`Partida adicionada com sucesso! ID: ${docRef.id}`);

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Partida adicionada com sucesso!",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao adicionar partida na API (POST):", error);
    return new Response(
      JSON.stringify({
        message: "Falha ao adicionar partida.",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
