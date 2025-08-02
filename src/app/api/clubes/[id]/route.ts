import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { TeamData } from "@/types/teams";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do clube é necessário." },
        { status: 400 }
      );
    }

    console.log(`Iniciando requisição GET para /api/clubes/${id}...`);

    const docRef = adminDB.collection("clubes").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      console.log(`Clube com ID ${id} não encontrado.`);
      return NextResponse.json(
        { message: "Clube não encontrado." },
        { status: 404 }
      );
    }

    const teamData = { id: docSnapshot.id, ...docSnapshot.data() } as TeamData;

    console.log(`Clube encontrado: ${JSON.stringify(teamData, null, 2)}`);

    return NextResponse.json(teamData, { status: 200 });
  } catch (error) {
    console.error(`Erro detalhado ao buscar clube com ID na API:`, error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar clube.",
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
        { message: "ID do clube não fornecido para atualização." },
        { status: 400 }
      );
    }

    console.log(`Tentando atualizar clube com ID: ${id}`);
    
    // Verificar se o clube existe antes de atualizar
    const docRef = adminDB.collection("clubes").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Clube não encontrado." },
        { status: 404 }
      );
    }

    await docRef.update(data);

    return NextResponse.json(
      { message: "Clube atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar clube (PUT):", error);
    return NextResponse.json(
      {
        message: "Falha ao atualizar clube",
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
        { message: "ID do clube não fornecido para exclusão." },
        { status: 400 }
      );
    }

    console.log(`Tentando excluir clube com ID: ${id}`);
    
    // Verificar se o clube existe antes de deletar
    const docRef = adminDB.collection("clubes").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Clube não encontrado." },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json(
      { message: "Clube excluído com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir clube (DELETE):", error);
    return NextResponse.json(
      {
        message: "Falha ao excluir clube",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
