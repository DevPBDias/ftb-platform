import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../../lib/firebase"; // Importa a instância do Firestore do seu lib/firebase.ts

interface Competicao {
  id?: string; // O ID do documento Firestore
  titulo: string; // Título da competição
  datas: string[]; // Array de datas da competição (como strings)
  descricao: string; // Descrição da competição
  local: string; // Local da competição
  image: string; // URL da imagem da competição
}

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/competicoes...");

    const competicoesCollectionRef = collection(firestore, "competicoes");

    const q = query(competicoesCollectionRef, orderBy("titulo", "asc"));

    console.log(
      "Tentando buscar documentos da coleção 'competicoes' no Firestore..."
    );
    const snapshot = await getDocs(q);

    const competicoes: Competicao[] = [];
    snapshot.forEach((doc) => {
      competicoes.push({ id: doc.id, ...(doc.data() as Competicao) });
    });

    console.log(`Número de competições encontradas: ${competicoes.length}`);
    console.log(
      "Competições encontradas:",
      JSON.stringify(competicoes, null, 2)
    );

    return NextResponse.json(competicoes, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar competições na API:", error);
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
    const data = await request.json(); // Get the JSON body from the request
    const competicoesCollectionRef = collection(firestore, "competicoes");

    const docRef = await addDoc(competicoesCollectionRef, data);

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Competicao added successfully!",
      }),
      {
        status: 201, // 201 Created
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding competicao:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add competition" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
