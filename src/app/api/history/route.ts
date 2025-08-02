import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { historySchema } from "@/schemas/about.schema";
import { HistoryType } from "@/constants/historyData";

export const dynamic = "force-dynamic";

// GET - Buscar todas as histórias
export async function GET() {
  try {
    const historyCollectionRef = adminDB.collection("history");
    const snapshot = await historyCollectionRef.orderBy("year", "asc").get();

    const histories: HistoryType[] = [];
    snapshot.forEach((doc) => {
      histories.push({ 
        id: doc.id,
        ...(doc.data() as Omit<HistoryType, 'id'>) 
      });
    });

    console.log(`Número de histórias encontradas: ${histories.length}`);
    return NextResponse.json(histories, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar histórias:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar histórias",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST - Criar nova história
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Dados recebidos para criação:", JSON.stringify(body, null, 2));

    // Valida os dados recebidos
    const validationResult = historySchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Erro de validação:", validationResult.error.errors);
      return NextResponse.json(
        {
          message: "Dados de história inválidos.",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    const docRef = await adminDB.collection("history").add(validatedData);

    const newHistory = {
      id: docRef.id,
      ...validatedData,
    };

    console.log("História criada com sucesso:", JSON.stringify(newHistory, null, 2));
    return NextResponse.json(
      {
        message: "História criada com sucesso!",
        data: newHistory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar história:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao criar história",
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
    const data: Partial<HistoryType> = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID da history não fornecido para atualização." },
        { status: 400 }
      );
    }

    console.log(`Tentando atualizar notícia com ID: ${id}`);
    await adminDB.collection("history").doc(id).update(data);

    return NextResponse.json(
      { message: "history atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar history (PUT):", error);
    return NextResponse.json(
      {
        message: "Falha ao atualizar history",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// A função DELETE foi movida para o arquivo [id]/route.ts
// Esta função não é mais necessária aqui, pois a exclusão deve ser feita
// através do endpoint /api/history/[id] e não /api/history
