import { FormEvent, useMemo, useState } from "react";
import { MessageSquareQuote, Plus, Star, Trash2 } from "lucide-react";
import { EditorModal } from "@/admin/components/EditorModal";
import { AdminField } from "@/admin/components/form/AdminField";
import { AdminTextInput } from "@/admin/components/form/AdminTextInput";
import { AdminTextarea } from "@/admin/components/form/AdminTextarea";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";
import { useContentCollection } from "@/admin/hooks/useContentCollection";
import { GoogleReviewContent, NormalizedContentItem } from "@/admin/types/content";
import { defaultGoogleReviewSeedItems } from "@/data/cms-defaults";

type ReviewFormState = {
  name: string;
  quote: string;
  designation: string;
  src: string;
  rating: string;
  reviewUrl: string;
  order: string;
  featured: boolean;
};

const emptyForm: ReviewFormState = {
  name: "",
  quote: "",
  designation: "Google Review",
  src: "",
  rating: "5",
  reviewUrl: "",
  order: "0",
  featured: false,
};

export function GoogleReviewsPage() {
  const { items, loading, error, firestoreConfigured, busyId, createItem, updateItem, deleteItem } =
    useContentCollection<GoogleReviewContent>("googleReviews");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NormalizedContentItem<GoogleReviewContent> | null>(null);
  const [form, setForm] = useState<ReviewFormState>(emptyForm);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [importing, setImporting] = useState(false);

  const filteredItems = useMemo(() => {
    const term = search.toLowerCase().trim();
    return items.filter((item) => {
      if (!term) {
        return true;
      }

      return [item.name, item.quote, item.designation]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [items, search]);

  const missingDefaultItems = useMemo(
    () =>
      defaultGoogleReviewSeedItems.filter(
        (seed) =>
          !items.some(
            (item) =>
              item.name.trim().toLowerCase() === seed.name.trim().toLowerCase() &&
              item.quote.trim().toLowerCase() === seed.quote.trim().toLowerCase(),
          ),
      ),
    [items],
  );

  const stats = [
    {
      title: "Reviews",
      value: String(items.length).padStart(2, "0"),
      helper: "Google reviews currently managed from Firestore.",
      icon: MessageSquareQuote,
    },
    {
      title: "Featured",
      value: String(items.filter((item) => item.featured).length).padStart(2, "0"),
      helper: "Reviews marked for stronger homepage placement.",
      icon: Star,
    },
    {
      title: "Imported",
      value: String(defaultGoogleReviewSeedItems.length - missingDefaultItems.length).padStart(2, "0"),
      helper: "Existing website reviews already available in the dashboard.",
      icon: Plus,
    },
    {
      title: "Ready to clean",
      value: "YES",
      helper: "Delete or update any testimonial later without touching code.",
      icon: Trash2,
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
    setForm({
      ...emptyForm,
      order: String(items.length),
    });
    setSubmitError(null);
    setOpen(true);
  };

  const openEdit = (item: NormalizedContentItem<GoogleReviewContent>) => {
    setEditing(item);
    setForm({
      name: item.name,
      quote: item.quote,
      designation: item.designation,
      src: item.src,
      rating: String(item.rating ?? 5),
      reviewUrl: item.reviewUrl ?? "",
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
        quote: form.quote.trim(),
        designation: form.designation.trim() || "Google Review",
        src: form.src.trim(),
        rating: Number(form.rating) || 5,
        reviewUrl: form.reviewUrl.trim(),
        order: Number(form.order) || 0,
        featured: form.featured,
      };

      if (editing) {
        await updateItem(editing.id, payload);
      } else {
        await createItem(payload as Omit<GoogleReviewContent, "id">);
      }

      resetEditor();
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Unable to save Google review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: NormalizedContentItem<GoogleReviewContent>) => {
    if (!window.confirm(`Delete review by "${item.name}"? This action cannot be undone.`)) {
      return;
    }

    await deleteItem(item.id);
  };

  const handleImportDefaults = async () => {
    setImporting(true);
    setSubmitError(null);

    try {
      if (!missingDefaultItems.length) {
        setSubmitError("All current website Google reviews are already available in the dashboard.");
        return;
      }

      for (const item of missingDefaultItems) {
        await createItem(item);
      }
    } catch (caught) {
      setSubmitError(
        caught instanceof Error ? caught.message : "Unable to import current website reviews.",
      );
    } finally {
      setImporting(false);
    }
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
            <p className="eyebrow">Google review control</p>
            <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
              Reviews Manager
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Keep your public testimonials synced to Firestore so you can add, update, import, or
              delete Google reviews from the dashboard whenever needed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => void handleImportDefaults()}
              disabled={importing || missingDefaultItems.length === 0}
            >
              {importing
                ? "Importing..."
                : missingDefaultItems.length === 0
                  ? "Reviews Imported"
                  : `Import Current Reviews (${missingDefaultItems.length})`}
            </Button>
            <Button onClick={openCreate}>Add Review</Button>
          </div>
        </div>

        {submitError ? (
          <div className="mt-6 rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
            {submitError}
          </div>
        ) : null}

        {!firestoreConfigured ? (
          <EmptyState
            title="Connect Firestore first"
            description="Add your Firebase environment variables before using the Google reviews manager."
            className="mt-6 rounded-[1.5rem]"
          />
        ) : loading ? (
          <div className="mt-6 flex min-h-[14rem] items-center justify-center">
            <LoadingSpinner label="Loading Google reviews" />
          </div>
        ) : error ? (
          <EmptyState
            title="Unable to load Google reviews"
            description={error}
            className="mt-6 rounded-[1.5rem]"
          />
        ) : (
          <div className="mt-6 space-y-6">
            <AdminTextInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reviewer name or review text"
            />

            {filteredItems.length === 0 ? (
              <EmptyState
                title={items.length === 0 ? "Import current website reviews" : "No reviews found"}
                description={
                  items.length === 0
                    ? "Bring the reviews already shown on the website into Firestore so you can edit or delete them from the admin."
                    : "Try another search term or add a new review."
                }
                className="rounded-[1.5rem]"
                action={
                  items.length === 0 ? (
                    <Button onClick={() => void handleImportDefaults()} disabled={importing}>
                      {importing ? "Importing..." : "Import Current Reviews"}
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909]"
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="h-64 w-full object-cover"
                    />
                    <div className="space-y-4 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.64rem] uppercase tracking-[0.28em] text-accentMuted">
                            {item.designation}
                          </p>
                          <h4 className="mt-3 font-display text-4xl uppercase leading-none text-bone">
                            {item.name}
                          </h4>
                        </div>
                        {item.featured ? (
                          <span className="rounded-full border border-accentMuted/40 bg-accentMuted/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-bone">
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs uppercase tracking-[0.22em] text-accentMuted">
                        {`${Math.max(1, Math.min(5, item.rating ?? 5))} Star Google Review`}
                      </p>
                      <p className="line-clamp-6 text-sm leading-7 text-muted">{item.quote}</p>
                      <div className="text-xs uppercase tracking-[0.22em] text-muted">
                        Order: {item.order ?? 0}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" onClick={() => openEdit(item)}>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => void handleDelete(item)}
                          disabled={busyId === item.id}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <EditorModal
        open={open}
        onClose={resetEditor}
        title={editing ? "Edit Review" : "Add Review"}
        subtitle="Google review content"
      >
        <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminField label="Reviewer name">
              <AdminTextInput
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Neha Saini"
                required
              />
            </AdminField>
            <AdminField label="Designation">
              <AdminTextInput
                value={form.designation}
                onChange={(event) =>
                  setForm((current) => ({ ...current, designation: event.target.value }))
                }
                placeholder="Google Review"
                required
              />
            </AdminField>
            <AdminField label="Profile image URL" className="md:col-span-2">
              <AdminTextInput
                value={form.src}
                onChange={(event) => setForm((current) => ({ ...current, src: event.target.value }))}
                placeholder="https://..."
                required
              />
            </AdminField>
            <AdminField label="Rating">
              <AdminTextInput
                type="number"
                min="1"
                max="5"
                value={form.rating}
                onChange={(event) =>
                  setForm((current) => ({ ...current, rating: event.target.value }))
                }
              />
            </AdminField>
            <AdminField label="Order">
              <AdminTextInput
                type="number"
                value={form.order}
                onChange={(event) => setForm((current) => ({ ...current, order: event.target.value }))}
              />
            </AdminField>
          </div>

          <AdminField label="Review text">
            <AdminTextarea
              value={form.quote}
              onChange={(event) => setForm((current) => ({ ...current, quote: event.target.value }))}
              placeholder="Paste the full Google review here."
              required
            />
          </AdminField>

          <AdminField label="Google review link" hint="Optional direct review URL.">
            <AdminTextInput
              value={form.reviewUrl}
              onChange={(event) =>
                setForm((current) => ({ ...current, reviewUrl: event.target.value }))
              }
              placeholder="https://..."
            />
          </AdminField>

          <label className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 px-4 py-3 text-sm text-bone">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((current) => ({ ...current, featured: event.target.checked }))
              }
            />
            Feature this review
          </label>

          {submitError ? (
            <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
              {submitError}
            </div>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={resetEditor}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <LoadingSpinner label="Saving" />
              ) : editing ? (
                "Update Review"
              ) : (
                "Create Review"
              )}
            </Button>
          </div>
        </form>
      </EditorModal>
    </div>
  );
}
