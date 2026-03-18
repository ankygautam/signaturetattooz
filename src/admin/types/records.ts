export type BookingStatus = "new" | "consultation" | "confirmed" | "completed" | "archived";
export type SubmissionStatus = "new" | "replied" | "in-progress" | "archived";

export type DashboardRecordBase = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  tattooIdea?: string;
  placement?: string;
  budget?: string;
  createdAt?: string | number | Date | { seconds?: number; nanoseconds?: number } | null;
  isRead?: boolean;
  read?: boolean;
  status?: string;
};

export type BookingRecord = DashboardRecordBase & {
  preferredDate?: string;
  preferredTime?: string;
  source?: string;
};

export type ContactSubmissionRecord = DashboardRecordBase & {
  subject?: string;
  source?: string;
};

export type FirestoreRecord<T extends DashboardRecordBase> = T & {
  normalizedRead: boolean;
  normalizedStatus: string;
  createdAtLabel: string;
  createdAtValue: number;
};
