import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../../lib/firebase";
import { ArbitroFetchResponse } from "@/types/referee.types";

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/arbitros...");

    const arbitrosCollectionRef = collection(firestore, "arbitros");

    const q = query(arbitrosCollectionRef, orderBy("experience", "asc"));

    console.log(
      "Tentando buscar documentos da coleção 'arbitros' no Firestore..."
    );
    const snapshot = await getDocs(q);

    const arbitros: ArbitroFetchResponse[] = [];
    snapshot.forEach((doc) => {
      arbitros.push({ id: doc.id, ...(doc.data() as ArbitroFetchResponse) });
    });

    console.log(`Número de arbitros encontradas: ${arbitros.length}`);
    console.log("Arbitros encontradas:", JSON.stringify(arbitros, null, 2));

    return NextResponse.json(arbitros, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar arbitros na API:", error);
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
    const arbitrosCollectionRef = collection(firestore, "arbitros");

    const docRef = await addDoc(arbitrosCollectionRef, data);

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
    console.error("Error adding Arbitro:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add competition" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
