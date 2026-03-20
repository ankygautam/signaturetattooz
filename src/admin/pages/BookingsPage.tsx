import { useMemo, useState } from "react";
import { CalendarCheck2, Clock3, Inbox, SearchCheck } from "lucide-react";
import { RecordDetailModal } from "@/admin/components/RecordDetailModal";
import { RecordsTable, TableColumn } from "@/admin/components/RecordsTable";
import { RecordsToolbar } from "@/admin/components/RecordsToolbar";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { useFirestoreRecords } from "@/admin/hooks/useFirestoreRecords";
import { BookingRecord, FirestoreRecord } from "@/admin/types/records";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";

const statuses = ["new", "consultation", "confirmed", "completed", "archived"];

export function BookingsPage() {
  const { records, loading, error, counts, busyId, firestoreConfigured, updateRecord, deleteRecord } =
    useFirestoreRecords<BookingRecord>({
      collectionName: "bookings",
      fallbackStatus: "new",
    });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [readState, setReadState] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<FirestoreRecord<BookingRecord> | null>(null);

  const filteredRecords = useMemo(() => {
    const term = search.toLowerCase().trim();

    return records.filter((record) => {
      const matchesSearch =
        term.length === 0 ||
        [record.name, record.email, record.phone, record.tattooIdea, record.placement, record.budget]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term));

      const matchesStatus = status === "all" || record.normalizedStatus === status;
      const matchesRead =
        readState === "all" ||
        (readState === "read" ? record.normalizedRead : !record.normalizedRead);

      return matchesSearch && matchesStatus && matchesRead;
    });
  }, [readState, records, search, status]);

  const stats = [
    {
      title: "Total bookings",
      value: String(counts.total).padStart(2, "0"),
      helper: "All booking records currently stored in Firestore.",
      icon: Inbox,
    },
    {
      title: "Unread",
      value: String(counts.unread).padStart(2, "0"),
      helper: "Fresh inquiries that still need their first look from the studio.",
      icon: SearchCheck,
    },
    {
      title: "Consultations",
      value: String(counts.statuses.consultation ?? 0).padStart(2, "0"),
      helper: "Bookings currently in concept or planning stage.",
      icon: Clock3,
    },
    {
      title: "Confirmed",
      value: String(counts.statuses.confirmed ?? 0).padStart(2, "0"),
      helper: "Sessions that are locked in and ready for prep.",
      icon: CalendarCheck2,
    },
  ];

  const columns: TableColumn<BookingRecord>[] = [
    {
      key: "client",
      label: "Guest",
      render: (record: FirestoreRecord<BookingRecord>) => (
        <div>
          <p className="font-medium text-bone">{record.name || "Unknown guest"}</p>
          <p className="mt-1 text-sm text-muted">{record.email}</p>
        </div>
      ),
    },
    {
      key: "idea",
      label: "Idea",
      render: (record: FirestoreRecord<BookingRecord>) => (
        <p className="text-sm leading-7 text-muted">{record.tattooIdea || "No tattoo idea shared yet"}</p>
      ),
    },
    {
      key: "placement",
      label: "Placement",
      render: (record: FirestoreRecord<BookingRecord>) => (
        <p className="text-sm text-bone/90">{record.placement || "Not specified"}</p>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (record: FirestoreRecord<BookingRecord>) => <StatusBadge status={record.normalizedStatus} />,
    },
    {
      key: "date",
      label: "Received",
      render: (record: FirestoreRecord<BookingRecord>) => (
        <div>
          <p className="text-sm text-bone/90">{record.createdAtLabel}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
            {record.normalizedRead ? "Read" : "Unread"}
          </p>
        </div>
      ),
    },
  ];

  const handleDelete = async (record: FirestoreRecord<BookingRecord>) => {
    if (!window.confirm(`Delete booking from ${record.name || record.email}? This cannot be undone.`)) {
      return;
    }

    await deleteRecord(record.id);
    setSelectedRecord((current) => (current?.id === record.id ? null : current));
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="panel rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="eyebrow">Firestore collection</p>
            <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
              Bookings
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Search by guest or tattoo idea, filter by status, open full details, mark items read, or move bookings through the studio pipeline.
            </p>
          </div>
        </div>

        {!firestoreConfigured ? (
          <EmptyState
            title="Connect Firestore first"
            description="Add your Firebase environment variables before using this module. Once Firestore is available, bookings will stream in live from the bookings collection."
            className="mt-6 rounded-[1.5rem]"
          />
        ) : loading ? (
          <div className="mt-6 flex min-h-[14rem] items-center justify-center">
            <LoadingSpinner label="Loading bookings" />
          </div>
        ) : error ? (
          <EmptyState
            title="Unable to load bookings"
            description={error}
            className="mt-6 rounded-[1.5rem]"
          />
        ) : records.length === 0 ? (
          <EmptyState
            title="No bookings yet"
            description="Firestore is connected, but the bookings collection is empty. New booking documents will appear here automatically."
            className="mt-6 rounded-[1.5rem]"
          />
        ) : (
          <div className="mt-6 space-y-6">
            <RecordsToolbar
              search={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={setStatus}
              readState={readState}
              onReadStateChange={setReadState}
              statuses={statuses}
            />

            {filteredRecords.length === 0 ? (
              <EmptyState
                title="No matching bookings"
                description="Try changing the search term or filters to find the booking you need."
                className="rounded-[1.5rem]"
              />
            ) : (
              <RecordsTable
                columns={columns}
                records={filteredRecords}
                statuses={statuses}
                busyId={busyId}
                onView={setSelectedRecord}
                onToggleRead={(record) => void updateRecord(record.id, { isRead: !record.normalizedRead })}
                onStatusChange={(record, nextStatus) => void updateRecord(record.id, { status: nextStatus })}
                onDelete={(record) => void handleDelete(record)}
              />
            )}
          </div>
        )}
      </section>

      <RecordDetailModal
        open={Boolean(selectedRecord)}
        title={selectedRecord?.name || "Booking details"}
        subtitle="Booking details"
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        fields={[
          { label: "Email", value: selectedRecord?.email },
          { label: "Phone", value: selectedRecord?.phone },
          { label: "Tattoo idea", value: selectedRecord?.tattooIdea },
          { label: "Placement", value: selectedRecord?.placement },
          { label: "Budget", value: selectedRecord?.budget },
          { label: "Preferred date", value: selectedRecord?.preferredDate },
          { label: "Preferred time", value: selectedRecord?.preferredTime },
          { label: "Message", value: selectedRecord?.message },
        ]}
      />
    </div>
  );
}
