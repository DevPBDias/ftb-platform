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
        { message: "ID da competição não fornecido para exclusão." },
        { status: 400 }
      );
    }

    console.log(`Tentando excluir competição com ID: ${id}`);
    
    // Verificar se a competição existe antes de deletar
    const docRef = adminDB.collection("competicoes").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Competição não encontrada." },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json(
      { message: "Competição excluída com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir competição (DELETE):", error);
    return NextResponse.json(
      {
        message: "Falha ao excluir competição",
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
        { message: "ID da competição não fornecido." },
        { status: 400 }
      );
    }

    console.log(`Buscando competição com ID: ${id}`);
    
    const docRef = adminDB.collection("competicoes").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Competição não encontrada." },
        { status: 404 }
      );
    }

    const competicao = { id: doc.id, ...doc.data() };

    return NextResponse.json(competicao, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar competição (GET):", error);
    return NextResponse.json(
      {
        message: "Falha ao buscar competição",
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
        { message: "ID da competição não fornecido para atualização." },
        { status: 400 }
      );
    }

    console.log(`Tentando atualizar competição com ID: ${id}`);
    
    // Verificar se a competição existe antes de atualizar
    const docRef = adminDB.collection("competicoes").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Competição não encontrada." },
        { status: 404 }
      );
    }

    await docRef.update(data);

    return NextResponse.json(
      { message: "Competição atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar competição (PUT):", error);
    return NextResponse.json(
      {
        message: "Falha ao atualizar competição",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
} 