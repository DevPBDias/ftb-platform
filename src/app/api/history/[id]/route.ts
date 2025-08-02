import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { HistoryType } from "@/constants/historyData";
import { historySchema } from "@/schemas/about.schema";

export const dynamic = "force-dynamic";

// GET - Buscar história por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "ID da história é necessário." },
        { status: 400 }
      );
    }

    const docRef = adminDB.collection("history").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return NextResponse.json(
        { message: "História não encontrada." },
        { status: 404 }
      );
    }

    const history = {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as HistoryType;

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar história:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar história",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// PUT - Atualizar história
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "ID da história é necessário." },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Dados para atualização:", JSON.stringify(body, null, 2));

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
    const docRef = adminDB.collection("history").doc(id);

    // Verifica se o documento existe
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return NextResponse.json(
        { message: "História não encontrada." },
        { status: 404 }
      );
    }

    // Atualiza o documento
    const updatePayload = {
      ...validatedData,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await docRef.update(updatePayload);

    // Busca o documento atualizado
    const updatedDocSnapshot = await docRef.get();
    const updatedHistory = {
      id: updatedDocSnapshot.id,
      ...updatedDocSnapshot.data(),
    } as HistoryType;

    console.log("História atualizada:", JSON.stringify(updatedHistory, null, 2));
    return NextResponse.json(updatedHistory, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar história:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao atualizar história",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Excluir história
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "ID da história é necessário." },
        { status: 400 }
      );
    }

    const docRef = adminDB.collection("history").doc(id);

    // Verifica se o documento existe
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return NextResponse.json(
        { message: "História não encontrada." },
        { status: 404 }
      );
    }

    // Armazena os dados antes de excluir
    const deletedHistory = {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as HistoryType;

    // Exclui o documento
    await docRef.delete();

    console.log("História excluída:", JSON.stringify(deletedHistory, null, 2));
    return NextResponse.json(
      { 
        message: "História excluída com sucesso", 
        data: deletedHistory 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir história:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao excluir história",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
