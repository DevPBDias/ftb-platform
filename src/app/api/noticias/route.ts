import { collection, getDocs, addDoc } from "firebase/firestore"; // Make sure addDoc is imported
import { firestore } from "@/lib/firebase"; // Your Firebase instance

export async function GET(request: Request) {
  try {
    const noticiasCollectionRef = collection(firestore, "noticias");
    const querySnapshot = await getDocs(noticiasCollectionRef);

    const noticias = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(noticias), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching noticias:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Get the JSON body from the request
    const noticiasCollectionRef = collection(firestore, "noticias");

    const docRef = await addDoc(noticiasCollectionRef, data);

    return new Response(
      JSON.stringify({ id: docRef.id, message: "Noticia added successfully!" }),
      {
        status: 201, // 201 Created
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding noticia:", error);
    return new Response(JSON.stringify({ error: "Failed to add news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
