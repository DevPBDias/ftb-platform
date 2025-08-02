import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { CompeticaoData } from "@/types/new-competition";

export async function GET() {
  try {
    const competicoesCollectionRef = adminDB.collection("competicoes");

    const snapshot = await competicoesCollectionRef
      .orderBy("titulo", "asc")
      .get();

    const competicoes: CompeticaoData[] = [];
    snapshot.forEach((doc) => {
      competicoes.push({ id: doc.id, ...(doc.data() as CompeticaoData) });
    });

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
    return new Response(
      JSON.stringify({ error: "Failed to add competition" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: Partial<CompeticaoData> = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID da competição não fornecido para atualização." },
        { status: 400 }
      );
    }

    await adminDB.collection("competicoes").doc(id).update(data);

    return NextResponse.json(
      { message: "Competição atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Falha ao atualizar competição",
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
        { message: "ID da competição não fornecido para exclusão." },
        { status: 400 }
      );
    }

    await adminDB.collection("competicoes").doc(id).delete();

    return NextResponse.json(
      { message: "Competição excluída com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Falha ao excluir competição",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
