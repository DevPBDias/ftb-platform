import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { NextResponse } from "next/server";
import { NoticiasResponse } from "@/types/news.types";

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/noticias...");

    const noticiasCollectionRef = collection(firestore, "noticias");

    const q = query(noticiasCollectionRef, orderBy("titulo", "asc"));

    console.log(
      "Tentando buscar documentos da coleção 'noticias' no Firestore..."
    );
    const snapshot = await getDocs(q);

    const noticias: NoticiasResponse[] = [];
    snapshot.forEach((doc) => {
      noticias.push({ id: doc.id, ...(doc.data() as NoticiasResponse) });
    });

    console.log(`Número de noticias encontradas: ${noticias.length}`);
    console.log("Noticias encontradas:", JSON.stringify(noticias, null, 2));

    return NextResponse.json(noticias, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar noticias na API:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar noticias",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const noticiasCollectionRef = collection(firestore, "noticias");

    const docRef = await addDoc(noticiasCollectionRef, data);

    return new Response(
      JSON.stringify({ id: docRef.id, message: "Noticia added successfully!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding noticia:", error);
    return new Response(JSON.stringify({ error: "Failed to add news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
