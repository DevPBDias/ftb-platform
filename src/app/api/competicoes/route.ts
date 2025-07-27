import { NextResponse } from "next/server";
// Remova as importações do SDK do cliente para Firestore
// import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";

// Importe a instância do Firestore do Firebase Admin SDK
import { adminDB } from "@/lib/firebase-admin"; // Certifique-se de que o caminho está correto

import { CompeticaoData } from "@/types/competicao.types"; // Mantenha a importação do seu tipo

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/competicoes...");

    // Use adminDB para acessar a coleção
    const competicoesCollectionRef = adminDB.collection("competicoes");

    console.log(
      "Tentando buscar documentos da coleção 'competicoes' no Firestore (Admin SDK)..."
    );
    // Para ordenar no Admin SDK, chame .orderBy() diretamente na referência da coleção
    const snapshot = await competicoesCollectionRef
      .orderBy("titulo", "asc")
      .get();

    const competicoes: CompeticaoData[] = [];
    snapshot.forEach((doc) => {
      // doc.data() já retorna um objeto com os dados
      // Você pode fazer um cast direto para o seu tipo
      competicoes.push({ id: doc.id, ...(doc.data() as CompeticaoData) });
    });

    console.log(`Número de competições encontradas: ${competicoes.length}`);
    console.log(
      "Competições encontradas:",
      JSON.stringify(competicoes, null, 2)
    );

    return NextResponse.json(competicoes, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar competições na API (GET):", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar competições",
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
    const docRef = await adminDB.collection("competicoes").add(data);

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Competicao added successfully!",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding competicao (POST):", error);
    return new Response(
      JSON.stringify({ error: "Failed to add competition" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
