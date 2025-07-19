import { useEffect, useState } from "react";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export function useFetchById<T = DocumentData>(
  collectionName: string,
  id: string | null
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    let isMounted = true;

    async function fetchDoc() {
      try {
        const docRef = doc(firestore, collectionName, id as string);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Documento não encontrado.");
        }

        if (isMounted) {
          setData({ id: docSnap.id, ...docSnap.data() } as T);
        }
      } catch (e) {
        if (isMounted) setError((e as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDoc();

    return () => {
      isMounted = false;
    };
  }, [collectionName, id]);

  return { data, loading, error };
}
