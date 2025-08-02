import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin"; // Importação CORRETA do ADMIN SDK
import { TeamData } from "@/types/teams";

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/clubes...");

    // Acessa a coleção diretamente do adminDB
    const clubesCollectionRef = adminDB.collection("clubes");

    // O Admin SDK Firestore usa métodos ligeiramente diferentes para queries
    // Não precisa de 'query' e 'orderBy' separados como no cliente SDK.
    // A ordem é aplicada diretamente na referência da coleção.
    console.log(
      "Tentando buscar documentos da coleção 'clubes' no Firestore (Admin SDK)..."
    );
    const snapshot = await clubesCollectionRef.orderBy("teamName", "asc").get();

    const clubes: TeamData[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      clubes.push({
        id: doc.id,
        teamName: data.teamName,
        logo: data.logo,
        image: data.image,
        description: data.description,
        founded: data.founded,
        location: data.location,
        contact: data.contact,
        stats: data.stats,
        championships: data.championships,
        admins: data.admins,
      } as TeamData);
    });

    console.log(`Número de clubes encontrados: ${clubes.length}`);
    console.log("Clubes encontradas:", JSON.stringify(clubes, null, 2));

    return NextResponse.json(clubes, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar clubes na API (GET):", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor ao buscar clubes",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Acessa a coleção diretamente do adminDB para adicionar
    const docRef = await adminDB.collection("clubes").add(data);

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Clube added successfully!",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding Clube (POST):", error);
    return new Response(
      JSON.stringify({ error: "Failed to add competition" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
