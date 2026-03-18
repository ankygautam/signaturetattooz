import { ReactNode } from "react";
import { Eye, MailOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { DashboardRecordBase, FirestoreRecord } from "@/admin/types/records";

export type TableColumn<T extends DashboardRecordBase> = {
  key: string;
  label: string;
  render: (record: FirestoreRecord<T>) => ReactNode;
  className?: string;
};

export function RecordsTable<T extends DashboardRecordBase>({
  columns,
  records,
  statuses,
  busyId,
  onView,
  onToggleRead,
  onStatusChange,
  onDelete,
}: {
  columns: TableColumn<T>[];
  records: FirestoreRecord<T>[];
  statuses: string[];
  busyId: string | null;
  onView: (record: FirestoreRecord<T>) => void;
  onToggleRead: (record: FirestoreRecord<T>) => void;
  onStatusChange: (record: FirestoreRecord<T>, status: string) => void;
  onDelete: (record: FirestoreRecord<T>) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909]">
      <div className="hidden grid-cols-[1.2fr_repeat(4,minmax(0,1fr))_14rem] gap-4 border-b border-white/10 px-5 py-4 text-[0.64rem] uppercase tracking-[0.28em] text-muted xl:grid">
        {columns.map((column) => (
          <div key={column.key} className={column.className}>
            {column.label}
          </div>
        ))}
        <div className="text-right">Actions</div>
      </div>

      <div className="divide-y divide-white/10">
        {records.map((record) => {
          const rowBusy = busyId === record.id;

          return (
            <div key={record.id} className="grid gap-5 px-5 py-5 xl:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))_14rem] xl:items-center">
              {columns.map((column) => (
                <div key={column.key} className={column.className}>
                  <p className="mb-2 text-[0.64rem] uppercase tracking-[0.28em] text-muted xl:hidden">
                    {column.label}
                  </p>
                  {column.render(record)}
                </div>
              ))}

              <div className="flex flex-wrap items-center justify-start gap-2 xl:justify-end">
                <button
                  onClick={() => onView(record)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accentMuted hover:text-bone"
                  aria-label="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onToggleRead(record)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accentMuted hover:text-bone"
                  aria-label={record.normalizedRead ? "Mark unread" : "Mark read"}
                >
                  <MailOpen className="h-4 w-4" />
                </button>
                <select
                  value={record.normalizedStatus}
                  onChange={(event) => onStatusChange(record, event.target.value)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.64rem] uppercase tracking-[0.2em] text-bone outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 rounded-full border-[#8d1f32]/35 bg-[#8d1f32]/8 px-3 py-0 text-[0.64rem] tracking-[0.22em] text-bone hover:border-[#8d1f32]/55 hover:bg-[#8d1f32]/15"
                  onClick={() => onDelete(record)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                {rowBusy ? <LoadingSpinner label="Saving" className="ml-1" /> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
