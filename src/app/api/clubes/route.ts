import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../../lib/firebase";
import { StaticImageData } from "next/image";

interface TeamData {
  logo?: StaticImageData | string;
  id?: string;
  teamName: string;
  admins: {
    id: number;
    name: string;
    image: StaticImageData;
    role?: string;
  }[];
  image: StaticImageData;
  description: string;
  championships?: {
    id: number;
    name: string;
    years: number[];
    quantity: number;
    category: string;
  }[];
  contact?: string;
}

export async function GET() {
  try {
    console.log("Iniciando requisição GET para /api/clubes...");

    const clubesCollectionRef = collection(firestore, "clubes");

    const q = query(clubesCollectionRef, orderBy("teamName", "asc"));

    console.log(
      "Tentando buscar documentos da coleção 'clubes' no Firestore..."
    );
    const snapshot = await getDocs(q);

    const clubes: TeamData[] = [];
    snapshot.forEach((doc) => {
      clubes.push({ id: doc.id, ...(doc.data() as TeamData) });
    });

    console.log(`Número de clubes encontrados: ${clubes.length}`);
    console.log("Clubes encontradas:", JSON.stringify(clubes, null, 2));

    return NextResponse.json(clubes, { status: 200 });
  } catch (error) {
    console.error("Erro detalhado ao buscar clubes na API:", error);
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
    const data = await request.json(); // Get the JSON body from the request
    const clubesCollectionRef = collection(firestore, "clubes");

    const docRef = await addDoc(clubesCollectionRef, data);

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Clube added successfully!",
      }),
      {
        status: 201, // 201 Created
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding Clube:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add competition" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
