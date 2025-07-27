import { NextResponse } from "next/server";
// Remova as importações do SDK do cliente para Firestore
// import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";

// Importe a instância do Firestore do Firebase Admin SDK
import { adminDB } from "@/lib/firebase-admin"; // Certifique-se de que o caminho está correto

import { ArbitroFetchResponse } from "@/types/referee.types"; // Mantenha a importação do seu tipo

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/arbitros...");

    // Use adminDB para acessar a coleção
    const arbitrosCollectionRef = adminDB.collection("arbitros");

    console.log(
      "Tentando buscar documentos da coleção 'arbitros' no Firestore (Admin SDK)..."
    );
    // Para ordenar no Admin SDK, chame .orderBy() diretamente na referência da coleção
    const snapshot = await arbitrosCollectionRef
      .orderBy("experience", "asc")
      .get();

    const arbitros: ArbitroFetchResponse[] = [];
    snapshot.forEach((doc) => {
      // doc.data() já retorna um objeto com os dados
      // Você pode fazer um cast direto para o seu tipo, ou mapear campos específicos se preferir
      arbitros.push({ id: doc.id, ...(doc.data() as ArbitroFetchResponse) });
    });

    console.log(`Número de arbitros encontradas: ${arbitros.length}`);
    console.log("Arbitros encontradas:", JSON.stringify(arbitros, null, 2));

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
    // Use adminDB para acessar a coleção e adicionar o documento
    const docRef = await adminDB.collection("arbitros").add(data);

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Arbitro added successfully!",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding Arbitro (POST):", error);
    return new Response(
      JSON.stringify({ error: "Failed to add competition" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
