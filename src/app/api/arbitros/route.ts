import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { ArbitroFetchResponse } from "@/types/referee.types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/arbitros...");

    const arbitrosCollectionRef = adminDB.collection("arbitros");

    console.log(
      "Tentando buscar documentos da coleção 'arbitros' no Firestore (Admin SDK)..."
    );
    
    const snapshot = await arbitrosCollectionRef
      .orderBy("experience", "asc")
      .get();

    const arbitros: ArbitroFetchResponse[] = [];
    snapshot.forEach((doc) => {
      arbitros.push({ id: doc.id, ...(doc.data() as ArbitroFetchResponse) });
    });

    console.log(`Número de arbitros encontrados: ${arbitros.length}`);
    console.log("Arbitros encontrados:", JSON.stringify(arbitros, null, 2));

    return NextResponse.json(arbitros, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar arbitros na API (GET):", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar arbitros",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Dados recebidos para criação:", JSON.stringify(data, null, 2));

    const docRef = await adminDB.collection("arbitros").add(data);

    const newArbitro = {
      id: docRef.id,
      ...data,
    };

    console.log("Árbitro criado com sucesso:", JSON.stringify(newArbitro, null, 2));
    return NextResponse.json(
      {
        message: "Árbitro criado com sucesso!",
        data: newArbitro,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar árbitro:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao criar árbitro",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
