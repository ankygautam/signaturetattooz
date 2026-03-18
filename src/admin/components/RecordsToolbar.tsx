import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecordsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  readState,
  onReadStateChange,
  statuses,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  readState: string;
  onReadStateChange: (value: string) => void;
  statuses: string[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.45fr_0.45fr]">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, email, phone, or tattoo idea"
          className="input-shell pl-11"
        />
      </label>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className={cn("input-shell appearance-none")}
      >
        <option value="all">All statuses</option>
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={readState}
        onChange={(event) => onReadStateChange(event.target.value)}
        className={cn("input-shell appearance-none")}
      >
        <option value="all">All states</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
      </select>
    </div>
  );
}
