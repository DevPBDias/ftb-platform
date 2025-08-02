import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { ArbitroFetchResponse } from "@/types/referee.types";

export const dynamic = "force-dynamic";

// GET - Buscar árbitro específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { message: "ID do árbitro não fornecido" },
        { status: 400 }
      );
    }

    const docRef = adminDB.collection("arbitros").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { message: "Árbitro não encontrado" },
        { status: 404 }
      );
    }

    const arbitro = {
      id: doc.id,
      ...(doc.data() as ArbitroFetchResponse)
    };

    return NextResponse.json(arbitro, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar árbitro:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar árbitro",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// PUT - Atualizar árbitro
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: Partial<ArbitroFetchResponse> = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID do árbitro não fornecido para atualização" },
        { status: 400 }
      );
    }

    console.log(`Tentando atualizar árbitro com ID: ${id}`);
    await adminDB.collection("arbitros").doc(id).update(data);

    return NextResponse.json(
      { message: "Árbitro atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar árbitro:", error);
    return NextResponse.json(
      {
        message: "Falha ao atualizar árbitro",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Excluir árbitro
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do árbitro não fornecido para exclusão" },
        { status: 400 }
      );
    }

    console.log(`Tentando excluir árbitro com ID: ${id}`);
    await adminDB.collection("arbitros").doc(id).delete();

    return NextResponse.json(
      { message: "Árbitro excluído com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir árbitro:", error);
    return NextResponse.json(
      {
        message: "Falha ao excluir árbitro",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
} 