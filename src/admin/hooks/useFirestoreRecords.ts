import { useEffect, useMemo, useState } from "react";
import {
  deleteCollectionRecord,
  firestoreConfigured,
  subscribeToCollection,
  updateCollectionRecord,
} from "@/admin/lib/firestore";
import { DashboardRecordBase, FirestoreRecord } from "@/admin/types/records";

type UseFirestoreRecordsOptions = {
  collectionName: string;
  fallbackStatus: string;
};

export function useFirestoreRecords<T extends DashboardRecordBase>({
  collectionName,
  fallbackStatus,
}: UseFirestoreRecordsOptions) {
  const [records, setRecords] = useState<FirestoreRecord<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!firestoreConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToCollection<T>(
      collectionName,
      fallbackStatus,
      (items) => {
        setRecords(items);
        setError(null);
        setLoading(false);
      },
      (caught) => {
        setError(caught.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [collectionName, fallbackStatus]);

  const counts = useMemo(() => {
    const unread = records.filter((record) => !record.normalizedRead).length;
    const statuses = records.reduce<Record<string, number>>((accumulator, record) => {
      accumulator[record.normalizedStatus] = (accumulator[record.normalizedStatus] ?? 0) + 1;
      return accumulator;
    }, {});

    return {
      total: records.length,
      unread,
      statuses,
    };
  }, [records]);

  const updateRecord = async (id: string, updates: Partial<Record<string, unknown>>) => {
    setBusyId(id);
    try {
      await updateCollectionRecord(collectionName, id, updates);
    } finally {
      setBusyId((current) => (current === id ? null : current));
    }
  };

  const deleteRecord = async (id: string) => {
    setBusyId(id);
    try {
      await deleteCollectionRecord(collectionName, id);
    } finally {
      setBusyId((current) => (current === id ? null : current));
    }
  };

  return {
    records,
    loading,
    error,
    busyId,
    counts,
    firestoreConfigured,
    updateRecord,
    deleteRecord,
  };
}
