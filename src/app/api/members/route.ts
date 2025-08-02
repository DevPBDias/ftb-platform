import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { memberSchema } from "@/schemas/about.schema";
import { MemberFederation } from "@/types/cards.types";

export const dynamic = "force-dynamic";

// GET - Buscar todos os membros
export async function GET() {
  try {
    const membersCollectionRef = adminDB.collection("members");
    const snapshot = await membersCollectionRef.orderBy("name", "asc").get();

    const members: MemberFederation[] = [];
    snapshot.forEach((doc) => {
      members.push({ 
        id: doc.id,
        ...(doc.data() as Omit<MemberFederation, 'id'>) 
      });
    });

    console.log(`Número de membros encontrados: ${members.length}`);
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar membros:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar membros",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST - Criar novo membro
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Dados recebidos para criação:", JSON.stringify(body, null, 2));

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
    const docRef = await adminDB.collection("members").add(validatedData);

    const newMember = {
      id: docRef.id,
      ...validatedData,
    };

    console.log("Membro criado com sucesso:", JSON.stringify(newMember, null, 2));
    return NextResponse.json(
      {
        message: "Membro criado com sucesso!",
        data: newMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar membro:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao criar membro",
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
    const data: Partial<MemberFederation> = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID da members não fornecido para atualização." },
        { status: 400 }
      );
    }

    console.log(`Tentando atualizar notícia com ID: ${id}`);
    await adminDB.collection("members").doc(id).update(data);

    return NextResponse.json(
      { message: "members atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar members (PUT):", error);
    return NextResponse.json(
      {
        message: "Falha ao atualizar members",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// A função DELETE foi movida para o arquivo [id]/route.ts
// Esta função não é mais necessária aqui, pois a exclusão deve ser feita
// através do endpoint /api/members/[id] e não /api/members
