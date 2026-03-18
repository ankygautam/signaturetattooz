import { X } from "lucide-react";
import { DashboardRecordBase, FirestoreRecord } from "@/admin/types/records";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { cn } from "@/lib/utils";

export function RecordDetailModal<T extends DashboardRecordBase>({
  open,
  title,
  subtitle,
  record,
  fields,
  onClose,
}: {
  open: boolean;
  title: string;
  subtitle: string;
  record: FirestoreRecord<T> | null;
  fields: Array<{ label: string; value: string | undefined }>;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm transition md:items-center",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] shadow-card">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <p className="eyebrow">{subtitle}</p>
            <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">{title}</h3>
            {record ? (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StatusBadge status={record.normalizedStatus} />
                <span className="text-sm text-muted">{record.createdAtLabel}</span>
                <span className="text-sm text-muted">
                  {record.normalizedRead ? "Read" : "Unread"}
                </span>
              </div>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accentMuted hover:text-bone"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[0.64rem] uppercase tracking-[0.28em] text-muted">{field.label}</p>
              <p className="mt-3 text-sm leading-7 text-bone/90">{field.value || "-"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
