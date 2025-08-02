import { NextResponse } from "next/server";
// Remova as importações do SDK do cliente para Firestore
// import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";

// Importe a instância do Firestore do Firebase Admin SDK
import { adminDB } from "@/lib/firebase-admin"; // Certifique-se de que o caminho está correto

import { NoticiaData, NoticiasResponse } from "@/types/news.types"; // Mantenha a importação do seu tipo

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/noticias...");

    // Use adminDB para acessar a coleção
    const noticiasCollectionRef = adminDB.collection("noticias");

    console.log(
      "Tentando buscar documentos da coleção 'noticias' no Firestore (Admin SDK)..."
    );
    // Para ordenar no Admin SDK, chame .orderBy() diretamente na referência da coleção
    const snapshot = await noticiasCollectionRef.orderBy("titulo", "asc").get();

    const noticias: NoticiasResponse[] = [];
    snapshot.forEach((doc) => {
      // doc.data() já retorna um objeto com os dados
      // Você pode fazer um cast direto para o seu tipo
      noticias.push({ id: doc.id, ...(doc.data() as NoticiasResponse) });
    });

    console.log(`Número de noticias encontradas: ${noticias.length}`);
    console.log("Noticias encontradas:", JSON.stringify(noticias, null, 2));

    return NextResponse.json(noticias, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar noticias na API (GET):", error);
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
    // Use adminDB para acessar a coleção e adicionar o documento
    const docRef = await adminDB.collection("noticias").add(data);

    return new Response(
      JSON.stringify({ id: docRef.id, message: "Noticia added successfully!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding noticia (POST):", error);
    return new Response(JSON.stringify({ error: "Failed to add news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: Partial<NoticiaData> = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID da notícia não fornecido para atualização." },
        { status: 400 }
      );
    }

    console.log(`Tentando atualizar notícia com ID: ${id}`);
    await adminDB.collection("noticias").doc(id).update(data);

    return NextResponse.json(
      { message: "Notícia atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar notícia (PUT):", error);
    return NextResponse.json(
      {
        message: "Falha ao atualizar notícia",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID da notícia não fornecido para exclusão." },
        { status: 400 }
      );
    }

    console.log(`Tentando excluir notícia com ID: ${id}`);
    await adminDB.collection("noticias").doc(id).delete();

    return NextResponse.json(
      { message: "Notícia excluída com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir notícia (DELETE):", error);
    return NextResponse.json(
      {
        message: "Falha ao excluir notícia",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
