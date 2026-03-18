import { FormEvent, useMemo, useState } from "react";
import { BadgeCheck, Image, PenTool, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";
import { EditorModal } from "@/admin/components/EditorModal";
import { AdminField } from "@/admin/components/form/AdminField";
import { AdminTextInput } from "@/admin/components/form/AdminTextInput";
import { AdminTextarea } from "@/admin/components/form/AdminTextarea";
import { AdminToggle } from "@/admin/components/form/AdminToggle";
import { useContentCollection } from "@/admin/hooks/useContentCollection";
import { ArtistContent, NormalizedContentItem } from "@/admin/types/content";

type ArtistFormState = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialties: string;
  instagram: string;
  facebook: string;
  youtube: string;
  order: string;
  featured: boolean;
};

const emptyForm: ArtistFormState = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  specialties: "",
  instagram: "",
  facebook: "",
  youtube: "",
  order: "0",
  featured: false,
};

function serializeSpecialties(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ArtistsManagementPage() {
  const { items, loading, error, firestoreConfigured, busyId, createItem, updateItem, deleteItem } =
    useContentCollection<ArtistContent>("artists");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NormalizedContentItem<ArtistContent> | null>(null);
  const [form, setForm] = useState<ArtistFormState>(emptyForm);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredItems = useMemo(() => {
    const term = search.toLowerCase().trim();
    return items.filter((item) => {
      if (term.length === 0) {
        return true;
      }

      return [item.name, item.role, item.bio, item.specialties.join(" ")].some((value) =>
        value.toLowerCase().includes(term),
      );
    });
  }, [items, search]);

  const stats = [
    {
      title: "Artists",
      value: String(items.length).padStart(2, "0"),
      helper: "Artist profiles currently managed in Firestore.",
      icon: UserRound,
    },
    {
      title: "Featured",
      value: String(items.filter((item) => item.featured).length).padStart(2, "0"),
      helper: "Profiles marked for primary placement or homepage spotlight.",
      icon: BadgeCheck,
    },
    {
      title: "With imagery",
      value: String(items.filter((item) => Boolean(item.imageUrl)).length).padStart(2, "0"),
      helper: "Artist cards currently ready with images.",
      icon: Image,
    },
    {
      title: "Specialties",
      value: String(items.reduce((count, item) => count + item.specialties.length, 0)).padStart(2, "0"),
      helper: "Total specialty tags across current artist profiles.",
      icon: PenTool,
    },
  ];

  const resetEditor = () => {
    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
    setSubmitError(null);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setSubmitError(null);
    setOpen(true);
  };

  const openEdit = (item: NormalizedContentItem<ArtistContent>) => {
    setEditing(item);
    setForm({
      name: item.name,
      role: item.role,
      bio: item.bio,
      imageUrl: item.imageUrl,
      specialties: item.specialties.join(", "),
      instagram: item.instagram || "",
      facebook: item.facebook || "",
      youtube: item.youtube || "",
      order: String(item.order ?? 0),
      featured: Boolean(item.featured),
    });
    setSubmitError(null);
    setOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        bio: form.bio.trim(),
        imageUrl: form.imageUrl.trim(),
        specialties: serializeSpecialties(form.specialties),
        instagram: form.instagram.trim(),
        facebook: form.facebook.trim(),
        youtube: form.youtube.trim(),
        order: Number(form.order) || 0,
        featured: form.featured,
      };

      if (editing) {
        await updateItem(editing.id, payload);
      } else {
        await createItem(payload as Omit<ArtistContent, "id">);
      }

      resetEditor();
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Unable to save artist.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: NormalizedContentItem<ArtistContent>) => {
    if (!window.confirm(`Delete artist \"${item.name}\"? This action cannot be undone.`)) {
      return;
    }

    await deleteItem(item.id);
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
            <p className="eyebrow">Firestore CRUD</p>
            <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
              Artists Manager
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Build rich artist profiles with bios, imagery, specialties, and social links using reusable forms and card-based management.
            </p>
          </div>
          <Button onClick={openCreate}>Add Artist</Button>
        </div>

        {!firestoreConfigured ? (
          <EmptyState title="Connect Firestore first" description="Add your Firebase environment variables before using the artists manager." className="mt-6 rounded-[1.5rem]" />
        ) : loading ? (
          <div className="mt-6 flex min-h-[14rem] items-center justify-center">
            <LoadingSpinner label="Loading artists" />
          </div>
        ) : error ? (
          <EmptyState title="Unable to load artists" description={error} className="mt-6 rounded-[1.5rem]" />
        ) : (
          <div className="mt-6 space-y-6">
            <AdminTextInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search artist name, role, or specialties" />

            {filteredItems.length === 0 ? (
              <EmptyState title="No artists found" description="Try another search term or add your first artist profile." className="rounded-[1.5rem]" />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909]">
                    <img src={item.imageUrl || "https://placehold.co/1200x900/111111/f4eee4?text=Artist"} alt={item.name} className="h-64 w-full object-cover" />
                    <div className="space-y-4 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-[0.64rem] uppercase tracking-[0.28em] text-accentMuted">{item.role}</p>
                          <h4 className="mt-3 font-display text-4xl uppercase leading-none text-bone">{item.name}</h4>
                        </div>
                        {item.featured ? (
                          <span className="rounded-full border border-accentMuted/40 bg-accentMuted/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-bone">
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <p className="line-clamp-4 text-sm leading-7 text-muted">{item.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.specialties.map((specialty) => (
                          <span key={specialty} className="rounded-full border border-white/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                        <Button variant="ghost" onClick={() => void handleDelete(item)} disabled={busyId === item.id}>Delete</Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <EditorModal open={open} onClose={resetEditor} title={editing ? "Edit Artist" : "Add Artist"} subtitle="Artist profile">
        <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminField label="Name">
              <AdminTextInput value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Nitin Gautam" required />
            </AdminField>
            <AdminField label="Role">
              <AdminTextInput value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} placeholder="Expert Tattooist & Digital Artist" required />
            </AdminField>
            <AdminField label="Image URL" className="md:col-span-2">
              <AdminTextInput value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} placeholder="https://..." />
            </AdminField>
            <AdminField label="Order">
              <AdminTextInput type="number" value={form.order} onChange={(event) => setForm((current) => ({ ...current, order: event.target.value }))} />
            </AdminField>
            <AdminField label="Specialties" hint="Separate values with commas or new lines.">
              <AdminTextInput value={form.specialties} onChange={(event) => setForm((current) => ({ ...current, specialties: event.target.value }))} placeholder="Blackwork, Realism, Fine Line" />
            </AdminField>
          </div>

          <AdminField label="Bio">
            <AdminTextarea value={form.bio} onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))} placeholder="Share the artist approach, mindset, and style." required />
          </AdminField>

          <div className="grid gap-5 md:grid-cols-3">
            <AdminField label="Instagram">
              <AdminTextInput value={form.instagram} onChange={(event) => setForm((current) => ({ ...current, instagram: event.target.value }))} placeholder="https://instagram.com/..." />
            </AdminField>
            <AdminField label="Facebook">
              <AdminTextInput value={form.facebook} onChange={(event) => setForm((current) => ({ ...current, facebook: event.target.value }))} placeholder="https://facebook.com/..." />
            </AdminField>
            <AdminField label="YouTube">
              <AdminTextInput value={form.youtube} onChange={(event) => setForm((current) => ({ ...current, youtube: event.target.value }))} placeholder="https://youtube.com/..." />
            </AdminField>
          </div>

          <AdminToggle checked={form.featured} onChange={(next) => setForm((current) => ({ ...current, featured: next }))} label="Feature this artist profile" />

          {submitError ? <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">{submitError}</div> : null}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={resetEditor}>Cancel</Button>
            <Button type="submit" disabled={submitting}>{submitting ? <LoadingSpinner label="Saving" /> : editing ? "Update Artist" : "Create Artist"}</Button>
          </div>
        </form>
      </EditorModal>
    </div>
  );
}
