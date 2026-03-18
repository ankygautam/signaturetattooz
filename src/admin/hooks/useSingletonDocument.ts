import { useEffect, useState } from "react";
import {
  firestoreConfigured,
  setSingletonDocument,
  subscribeToSingletonDocument,
} from "@/admin/lib/firestore";

export function useSingletonDocument<T extends Record<string, unknown>>(
  collectionName: string,
  documentId: string,
  defaultValue: T,
) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firestoreConfigured) {
      setValue(defaultValue);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToSingletonDocument<T>(
      collectionName,
      documentId,
      defaultValue,
      (nextValue) => {
        setValue(nextValue);
        setError(null);
        setLoading(false);
      },
      (caught) => {
        setError(caught.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [collectionName, defaultValue, documentId]);

  const save = async (nextValue: T) => {
    setSaving(true);
    setError(null);
    try {
      await setSingletonDocument(collectionName, documentId, nextValue);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save document.");
      throw caught;
    } finally {
      setSaving(false);
    }
  };

  return {
    value,
    setValue,
    loading,
    saving,
    error,
    firestoreConfigured,
    save,
  };
}
