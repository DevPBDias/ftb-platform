import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    // Buscar configurações do Firestore - usando a coleção "configuration" e o documento existente
    const configSnapshot = await adminDB.collection("configuration").get();

    if (configSnapshot.empty) {
      // Se não existir, retornar configuração padrão
      return NextResponse.json({
        inscricao: false,
      });
    }

    // Pegar o primeiro documento da coleção
    const configDoc = configSnapshot.docs[0];
    const configData = configDoc.data();

    console.log("Configuração encontrada:", configData);

    return NextResponse.json({
      inscricao: configData?.inscricao ?? false,
    });
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { inscricao } = body;

    // Validar dados
    if (typeof inscricao !== "boolean") {
      return NextResponse.json(
        { error: "Campo 'inscricao' deve ser um boolean" },
        { status: 400 }
      );
    }

    // Buscar o documento existente para atualizar
    const configSnapshot = await adminDB.collection("configuration").get();

    if (configSnapshot.empty) {
      // Se não existir, criar um novo documento
      const newDocRef = await adminDB.collection("configuration").add({
        inscricao,
        updatedAt: new Date(),
      });

      console.log("Novo documento de configuração criado:", newDocRef.id);
    } else {
      // Atualizar o documento existente
      const configDoc = configSnapshot.docs[0];
      await configDoc.ref.update({
        inscricao,
        updatedAt: new Date(),
      });

      console.log("Documento de configuração atualizado:", configDoc.id);
    }

    return NextResponse.json({
      success: true,
      inscricao,
    });
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
