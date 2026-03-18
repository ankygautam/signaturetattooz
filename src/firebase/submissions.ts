import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigured } from "@/firebase/config";

export type PublicInquiryPayload = {
  name: string;
  email: string;
  phone: string;
  placement: string;
  tattooIdea: string;
  budget: string;
  message: string;
};

export async function submitPublicInquiry(payload: PublicInquiryPayload) {
  if (!firebaseConfigured || !db) {
    throw new Error("Firebase is not configured yet. Please try again in a moment.");
  }

  const baseRecord = {
    ...payload,
    source: "website-contact-form",
    status: "new",
    isRead: false,
    createdAt: serverTimestamp(),
  };

  await Promise.all([
    addDoc(collection(db, "bookings"), {
      ...baseRecord,
      preferredDate: "",
      preferredTime: "",
    }),
    addDoc(collection(db, "contactSubmissions"), {
      ...baseRecord,
      subject: payload.tattooIdea || "Website inquiry",
    }),
  ]);
}
