import {
  addDoc,
  CollectionReference,
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ContentBase, NormalizedContentItem } from "@/admin/types/content";
import { db, firebaseConfigured } from "@/firebase/config";
import { DashboardRecordBase, FirestoreRecord } from "@/admin/types/records";

export const firestoreConfigured = firebaseConfigured && Boolean(db);

const numberFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function toMillis(value: DashboardRecordBase["createdAt"]) {
  if (!value) {
    return 0;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  if (typeof value === "object" && "seconds" in value && typeof value.seconds === "number") {
    return value.seconds * 1000;
  }

  return 0;
}

function toContentMillis(value: ContentBase["createdAt"] | ContentBase["updatedAt"]) {
  return toMillis(value);
}

export function normalizeRecord<T extends DashboardRecordBase>(
  id: string,
  data: T,
  fallbackStatus: string,
): FirestoreRecord<T> {
  const createdAtValue = toMillis(data.createdAt);

  return {
    ...data,
    id,
    normalizedRead: Boolean(data.isRead ?? data.read ?? false),
    normalizedStatus: data.status ?? fallbackStatus,
    createdAtLabel: createdAtValue ? numberFormatter.format(createdAtValue) : "No date",
    createdAtValue,
  };
}

function getCollectionReference(name: string) {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  return collection(db, name) as CollectionReference<DocumentData>;
}

function normalizeContentItem<T extends ContentBase>(
  id: string,
  data: T,
): NormalizedContentItem<T> {
  const createdAtValue = toContentMillis(data.createdAt);
  const updatedAtValue = toContentMillis(data.updatedAt);

  return {
    ...data,
    id,
    createdAtValue,
    updatedAtValue,
    createdAtLabel: createdAtValue ? numberFormatter.format(createdAtValue) : "No date",
  };
}

export function subscribeToCollection<T extends DashboardRecordBase>(
  name: string,
  fallbackStatus: string,
  onData: (items: FirestoreRecord<T>[]) => void,
  onError: (error: Error) => void,
) {
  try {
    const ref = getCollectionReference(name);

    return onSnapshot(
      ref,
      (snapshot) => {
        const items = snapshot.docs
          .map((entry) => normalizeRecord<T>(entry.id, entry.data() as T, fallbackStatus))
          .sort((left, right) => right.createdAtValue - left.createdAtValue);

        onData(items);
      },
      (error) => onError(error),
    );
  } catch (error) {
    onError(error instanceof Error ? error : new Error("Unable to load collection."));
    return () => undefined;
  }
}

export function subscribeToContentCollection<T extends ContentBase>(
  name: string,
  onData: (items: NormalizedContentItem<T>[]) => void,
  onError: (error: Error) => void,
) {
  try {
    const ref = getCollectionReference(name);

    return onSnapshot(
      ref,
      (snapshot) => {
        const items = snapshot.docs
          .map((entry) => normalizeContentItem<T>(entry.id, entry.data() as T))
          .sort((left, right) => {
            const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
            const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

            if (leftOrder !== rightOrder) {
              return leftOrder - rightOrder;
            }

            return right.updatedAtValue - left.updatedAtValue || right.createdAtValue - left.createdAtValue;
          });

        onData(items);
      },
      (error) => onError(error),
    );
  } catch (error) {
    onError(error instanceof Error ? error : new Error("Unable to load collection."));
    return () => undefined;
  }
}

export async function createCollectionItem<T extends Record<string, unknown>>(
  collectionName: string,
  payload: T,
) {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await addDoc(collection(db, collectionName), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateCollectionRecord(
  collectionName: string,
  id: string,
  updates: Partial<Record<string, unknown>>,
) {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await updateDoc(doc(db, collectionName, id), updates);
}

export async function deleteCollectionRecord(collectionName: string, id: string) {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await deleteDoc(doc(db, collectionName, id));
}

export async function updateCollectionItem(
  collectionName: string,
  id: string,
  updates: Partial<Record<string, unknown>>,
) {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await updateDoc(doc(db, collectionName, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToSingletonDocument<T extends Record<string, unknown>>(
  collectionName: string,
  documentId: string,
  defaultValue: T,
  onData: (value: T) => void,
  onError: (error: Error) => void,
) {
  if (!db) {
    onError(new Error("Firestore is not configured."));
    return () => undefined;
  }

  return onSnapshot(
    doc(db, collectionName, documentId),
    (snapshot) => {
      if (!snapshot.exists()) {
        onData(defaultValue);
        return;
      }

      onData({
        ...defaultValue,
        ...(snapshot.data() as T),
      });
    },
    (error) => onError(error),
  );
}

export async function setSingletonDocument<T extends Record<string, unknown>>(
  collectionName: string,
  documentId: string,
  payload: T,
) {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  await setDoc(
    doc(db, collectionName, documentId),
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
