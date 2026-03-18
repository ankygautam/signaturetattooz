import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db, firebaseConfigured } from "@/firebase/config";

export function usePublicContentCollection<T>(collectionName: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);

  useEffect(() => {
    if (!firebaseConfigured || !db) {
      setItems(fallback);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        if (snapshot.empty) {
          setItems(fallback);
          return;
        }

        setItems(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }) as T));
      },
      () => setItems(fallback),
    );

    return unsubscribe;
  }, [collectionName, fallback]);

  return items;
}

export function usePublicSingletonDocument<T extends Record<string, unknown>>(
  collectionName: string,
  documentId: string,
  fallback: T,
) {
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    if (!firebaseConfigured || !db) {
      setValue(fallback);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, collectionName, documentId),
      (snapshot) => {
        if (!snapshot.exists()) {
          setValue(fallback);
          return;
        }

        setValue({
          ...fallback,
          ...(snapshot.data() as T),
        });
      },
      () => setValue(fallback),
    );

    return unsubscribe;
  }, [collectionName, documentId, fallback]);

  return value;
}
