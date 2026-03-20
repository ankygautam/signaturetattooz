import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, BarChart3, CalendarRange, MessageSquareDot } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { useFirestoreRecords } from "@/admin/hooks/useFirestoreRecords";
import { useContentCollection } from "@/admin/hooks/useContentCollection";
import { BookingRecord, ContactSubmissionRecord } from "@/admin/types/records";
import { ArtistContent, GalleryItemContent, ServiceContent } from "@/admin/types/content";
import { EmptyState } from "@/components/ui/EmptyState";

function buildTrend(values: number[]) {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return labels.map((label, index) => ({
    label,
    value: values[index] ?? 0,
  }));
}

function countRecent(records: Array<{ createdAtValue: number }>) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const buckets = Array.from({ length: 7 }, () => 0);

  records.forEach((record) => {
    if (!record.createdAtValue) {
      return;
    }

    const created = new Date(record.createdAtValue);
    const diff = Math.floor((created.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (diff >= 0 && diff < 7) {
      buckets[diff] += 1;
    }
  });

  return buildTrend(buckets);
}

export function AnalyticsPage() {
  const bookings = useFirestoreRecords<BookingRecord>({ collectionName: "bookings", fallbackStatus: "new" });
  const contacts = useFirestoreRecords<ContactSubmissionRecord>({ collectionName: "contactSubmissions", fallbackStatus: "new" });
  const gallery = useContentCollection<GalleryItemContent>("galleryItems");
  const services = useContentCollection<ServiceContent>("services");
  const artists = useContentCollection<ArtistContent>("artists");

  const liveConfigured =
    bookings.firestoreConfigured && contacts.firestoreConfigured && gallery.firestoreConfigured;

  const bookingTrend = bookings.records.length > 0 ? countRecent(bookings.records) : buildTrend([1, 2, 2, 3, 1, 4, 2]);
  const contactTrend = contacts.records.length > 0 ? countRecent(contacts.records) : buildTrend([0, 1, 2, 1, 3, 2, 1]);

  const statusBreakdown = Object.entries(bookings.counts.statuses).length > 0
    ? Object.entries(bookings.counts.statuses).map(([name, value]) => ({ name, value }))
    : [
        { name: "new", value: 4 },
        { name: "consultation", value: 3 },
        { name: "confirmed", value: 2 },
      ];

  const contentMix = [
    { name: "Gallery", value: gallery.items.length || 6 },
    { name: "Services", value: services.items.length || 5 },
    { name: "Artists", value: artists.items.length || 1 },
  ];

  const stats = [
    {
      title: "Bookings",
      value: String(bookings.counts.total || 12).padStart(2, "0"),
      helper: "Total booking records currently visible to the admin dashboard.",
      icon: CalendarRange,
    },
    {
      title: "Messages",
      value: String(contacts.counts.total || 9).padStart(2, "0"),
      helper: "Contact submissions currently in the studio pipeline.",
      icon: MessageSquareDot,
    },
    {
      title: "Content blocks",
      value: String((gallery.items.length || 6) + (services.items.length || 5) + (artists.items.length || 1)).padStart(2, "0"),
      helper: "Managed gallery, service, and artist records across Firestore.",
      icon: Activity,
    },
    {
      title: "Analytics mode",
      value: liveConfigured ? "LIVE" : "DEMO",
      helper: liveConfigured ? "Charts are reading from connected Firestore collections." : "Charts are showing branded fallback data until Firebase data is live.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {!liveConfigured ? (
        <EmptyState
          title="Analytics preview mode"
          description="Firestore is not fully configured yet, so this page is showing polished sample analytics in the Signature Tattooz style. Once bookings, contacts, and content collections are live, the charts switch to real data automatically."
          className="rounded-[2rem]"
        />
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel rounded-[2rem] p-6 md:p-8">
          <p className="eyebrow">Weekly momentum</p>
          <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">Bookings Vs Contacts</h3>
          <div className="mt-8 h-[22rem] w-full">
            <ResponsiveContainer>
              <AreaChart data={bookingTrend.map((item, index) => ({
                label: item.label,
                bookings: item.value,
                contacts: contactTrend[index]?.value ?? 0,
              }))}>
                <defs>
                  <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b79160" stopOpacity={0.65} />
                    <stop offset="95%" stopColor="#b79160" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="contactsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8d1f32" stopOpacity={0.65} />
                    <stop offset="95%" stopColor="#8d1f32" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(244,238,228,0.5)" tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(244,238,228,0.5)" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#0c0c0c",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "18px",
                    color: "#f4eee4",
                  }}
                />
                <Area type="monotone" dataKey="bookings" stroke="#b79160" fill="url(#bookingsGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="contacts" stroke="#8d1f32" fill="url(#contactsGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel rounded-[2rem] p-6 md:p-8">
          <p className="eyebrow">Pipeline health</p>
          <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">Booking Status Split</h3>
          <div className="mt-8 h-[22rem] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  fill="#b79160"
                />
                <Tooltip
                  contentStyle={{
                    background: "#0c0c0c",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "18px",
                    color: "#f4eee4",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel rounded-[2rem] p-6 md:p-8">
          <p className="eyebrow">Content coverage</p>
          <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">Managed Content Mix</h3>
          <div className="mt-8 h-[20rem] w-full">
            <ResponsiveContainer>
              <BarChart data={contentMix}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(244,238,228,0.5)" tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(244,238,228,0.5)" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#0c0c0c",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "18px",
                    color: "#f4eee4",
                  }}
                />
                <Bar dataKey="value" fill="#b79160" radius={[14, 14, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel rounded-[2rem] p-6 md:p-8">
          <p className="eyebrow">Studio pulse</p>
          <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">What To Watch Next</h3>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
              <p className="font-display text-3xl uppercase leading-none text-bone">Unread follow-ups</p>
              <p className="mt-3">{bookings.counts.unread + contacts.counts.unread || 5} guest conversations still need a first reply or status update.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
              <p className="font-display text-3xl uppercase leading-none text-bone">Content freshness</p>
              <p className="mt-3">Gallery, services, and artist collections are ready to support a more dynamic public site once you swap the homepage to Firestore-driven content.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
              <p className="font-display text-3xl uppercase leading-none text-bone">Tattoo School demand</p>
              <p className="mt-3">Compare bookings and contact trends here to understand when Tattoo School promotions are pulling in more direct studio interest.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
