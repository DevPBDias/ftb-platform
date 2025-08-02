import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";

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
    
    // Verificar se a notícia existe antes de deletar
    const docRef = adminDB.collection("noticias").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Notícia não encontrada." },
        { status: 404 }
      );
    }

    await docRef.delete();

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID da notícia não fornecido." },
        { status: 400 }
      );
    }

    console.log(`Buscando notícia com ID: ${id}`);
    
    const docRef = adminDB.collection("noticias").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Notícia não encontrada." },
        { status: 404 }
      );
    }

    const noticia = { id: doc.id, ...doc.data() };

    return NextResponse.json(noticia, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar notícia (GET):", error);
    return NextResponse.json(
      {
        message: "Falha ao buscar notícia",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID da notícia não fornecido para atualização." },
        { status: 400 }
      );
    }

    console.log(`Tentando atualizar notícia com ID: ${id}`);
    
    // Verificar se a notícia existe antes de atualizar
    const docRef = adminDB.collection("noticias").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Notícia não encontrada." },
        { status: 404 }
      );
    }

    await docRef.update(data);

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