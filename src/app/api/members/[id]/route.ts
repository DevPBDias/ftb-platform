import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { MemberFederation } from "@/types/cards.types";
import { memberSchema } from "@/schemas/about.schema";

export const dynamic = "force-dynamic";

// GET - Buscar membro por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do membro é necessário." },
        { status: 400 }
      );
    }

    const docRef = adminDB.collection("members").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return NextResponse.json(
        { message: "Membro não encontrado." },
        { status: 404 }
      );
    }

    const member = {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as MemberFederation;

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar membro:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar membro",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// PUT - Atualizar membro
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do membro é necessário." },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Dados para atualização:", JSON.stringify(body, null, 2));

    // Valida os dados recebidos
    const validationResult = memberSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Erro de validação:", validationResult.error.errors);
      return NextResponse.json(
        {
          message: "Dados de membro inválidos.",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    const docRef = adminDB.collection("members").doc(id);

    // Verifica se o documento existe
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return NextResponse.json(
        { message: "Membro não encontrado." },
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
    const updatedMember = {
      id: updatedDocSnapshot.id,
      ...updatedDocSnapshot.data(),
    } as MemberFederation;

    console.log("Membro atualizado:", JSON.stringify(updatedMember, null, 2));
    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar membro:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao atualizar membro",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Excluir membro
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do membro é necessário." },
        { status: 400 }
      );
    }

    const docRef = adminDB.collection("members").doc(id);

    // Verifica se o documento existe
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return NextResponse.json(
        { message: "Membro não encontrado." },
        { status: 404 }
      );
    }

    // Armazena os dados antes de excluir
    const deletedMember = {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as MemberFederation;

    // Exclui o documento
    await docRef.delete();

    console.log("Membro excluído:", JSON.stringify(deletedMember, null, 2));
    return NextResponse.json(
      { 
        message: "Membro excluído com sucesso", 
        data: deletedMember 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir membro:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao excluir membro",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
