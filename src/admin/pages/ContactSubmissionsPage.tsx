import { useMemo, useState } from "react";
import { Inbox, MailCheck, MailWarning, MessageSquareShare } from "lucide-react";
import { RecordDetailModal } from "@/admin/components/RecordDetailModal";
import { RecordsTable, TableColumn } from "@/admin/components/RecordsTable";
import { RecordsToolbar } from "@/admin/components/RecordsToolbar";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { useFirestoreRecords } from "@/admin/hooks/useFirestoreRecords";
import { ContactSubmissionRecord, FirestoreRecord } from "@/admin/types/records";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";

const statuses = ["new", "replied", "in-progress", "archived"];

export function ContactSubmissionsPage() {
  const { records, loading, error, counts, busyId, firestoreConfigured, updateRecord, deleteRecord } =
    useFirestoreRecords<ContactSubmissionRecord>({
      collectionName: "contactSubmissions",
      fallbackStatus: "new",
    });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [readState, setReadState] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<FirestoreRecord<ContactSubmissionRecord> | null>(null);

  const filteredRecords = useMemo(() => {
    const term = search.toLowerCase().trim();

    return records.filter((record) => {
      const matchesSearch =
        term.length === 0 ||
        [record.name, record.email, record.phone, record.subject, record.tattooIdea, record.message]
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
      title: "Total submissions",
      value: String(counts.total).padStart(2, "0"),
      helper: "All contact submissions currently stored in Firestore.",
      icon: Inbox,
    },
    {
      title: "Unread",
      value: String(counts.unread).padStart(2, "0"),
      helper: "Messages that still need a first response from the studio.",
      icon: MailWarning,
    },
    {
      title: "Replied",
      value: String(counts.statuses.replied ?? 0).padStart(2, "0"),
      helper: "Conversations where the studio has already responded.",
      icon: MailCheck,
    },
    {
      title: "In progress",
      value: String(counts.statuses["in-progress"] ?? 0).padStart(2, "0"),
      helper: "Submissions being shaped into consultation or design next steps.",
      icon: MessageSquareShare,
    },
  ];

  const columns: TableColumn<ContactSubmissionRecord>[] = [
    {
      key: "sender",
      label: "Sender",
      render: (record: FirestoreRecord<ContactSubmissionRecord>) => (
        <div>
          <p className="font-medium text-bone">{record.name || "Unknown sender"}</p>
          <p className="mt-1 text-sm text-muted">{record.email}</p>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (record: FirestoreRecord<ContactSubmissionRecord>) => (
        <p className="text-sm leading-7 text-muted">{record.subject || record.tattooIdea || "General inquiry"}</p>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (record: FirestoreRecord<ContactSubmissionRecord>) => (
        <p className="text-sm text-bone/90">{record.phone || "Not shared"}</p>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (record: FirestoreRecord<ContactSubmissionRecord>) => <StatusBadge status={record.normalizedStatus} />,
    },
    {
      key: "date",
      label: "Received",
      render: (record: FirestoreRecord<ContactSubmissionRecord>) => (
        <div>
          <p className="text-sm text-bone/90">{record.createdAtLabel}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
            {record.normalizedRead ? "Read" : "Unread"}
          </p>
        </div>
      ),
    },
  ];

  const handleDelete = async (record: FirestoreRecord<ContactSubmissionRecord>) => {
    if (!window.confirm(`Delete submission from ${record.name || record.email}? This cannot be undone.`)) {
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
              Contact Submissions
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Keep every inquiry organized, searchable, and easy to move from unread message to active studio conversation.
            </p>
          </div>
        </div>

        {!firestoreConfigured ? (
          <EmptyState
            title="Connect Firestore first"
            description="Add your Firebase environment variables before using this module. Once Firestore is available, messages will stream in live from the contactSubmissions collection."
            className="mt-6 rounded-[1.5rem]"
          />
        ) : loading ? (
          <div className="mt-6 flex min-h-[14rem] items-center justify-center">
            <LoadingSpinner label="Loading contact submissions" />
          </div>
        ) : error ? (
          <EmptyState
            title="Unable to load contact submissions"
            description={error}
            className="mt-6 rounded-[1.5rem]"
          />
        ) : records.length === 0 ? (
          <EmptyState
            title="No contact submissions yet"
            description="Firestore is connected, but the contactSubmissions collection is empty. New inquiry documents will appear here automatically."
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
                title="No matching submissions"
                description="Try changing the search term or filters to find the message you need."
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
        title={selectedRecord?.name || "Contact details"}
        subtitle="Contact submission"
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        fields={[
          { label: "Email", value: selectedRecord?.email },
          { label: "Phone", value: selectedRecord?.phone },
          { label: "Subject", value: selectedRecord?.subject },
          { label: "Tattoo idea", value: selectedRecord?.tattooIdea },
          { label: "Placement", value: selectedRecord?.placement },
          { label: "Budget", value: selectedRecord?.budget },
          { label: "Source", value: selectedRecord?.source },
          { label: "Message", value: selectedRecord?.message },
        ]}
      />
    </div>
  );
}
