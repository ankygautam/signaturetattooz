import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app, firebaseConfigured } from "@/firebase/config";

const storage = app ? getStorage(app) : null;
export const storageConfigured = firebaseConfigured && Boolean(storage);

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]+/g, "-").toLowerCase();
}

export async function uploadImageFile(file: File, folder: string) {
  if (!storage) {
    throw new Error("Firebase Storage is not configured.");
  }

  const fileRef = ref(storage, `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}
