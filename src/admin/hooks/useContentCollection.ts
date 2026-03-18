import { useEffect, useState } from "react";
import {
  createCollectionItem,
  deleteCollectionRecord,
  firestoreConfigured,
  subscribeToContentCollection,
  updateCollectionItem,
} from "@/admin/lib/firestore";
import { ContentBase, NormalizedContentItem } from "@/admin/types/content";

export function useContentCollection<T extends ContentBase>(collectionName: string) {
  const [items, setItems] = useState<NormalizedContentItem<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!firestoreConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToContentCollection<T>(
      collectionName,
      (nextItems) => {
        setItems(nextItems);
        setError(null);
        setLoading(false);
      },
      (caught) => {
        setError(caught.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [collectionName]);

  const createItem = async (payload: Omit<T, "id">) => {
    setBusyId("creating");
    try {
      await createCollectionItem(collectionName, payload);
    } finally {
      setBusyId(null);
    }
  };

  const updateItem = async (id: string, payload: Partial<Omit<T, "id">>) => {
    setBusyId(id);
    try {
      await updateCollectionItem(collectionName, id, payload);
    } finally {
      setBusyId((current) => (current === id ? null : current));
    }
  };

  const deleteItem = async (id: string) => {
    setBusyId(id);
    try {
      await deleteCollectionRecord(collectionName, id);
    } finally {
      setBusyId((current) => (current === id ? null : current));
    }
  };

  return {
    items,
    loading,
    error,
    busyId,
    firestoreConfigured,
    createItem,
    updateItem,
    deleteItem,
  };
}
