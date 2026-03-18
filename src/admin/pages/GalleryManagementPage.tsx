import { FormEvent, useMemo, useState } from "react";
import { ImagePlus, Images, Layers3, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";
import { EditorModal } from "@/admin/components/EditorModal";
import { AdminField } from "@/admin/components/form/AdminField";
import { AdminSelect } from "@/admin/components/form/AdminSelect";
import { AdminTextInput } from "@/admin/components/form/AdminTextInput";
import { AdminToggle } from "@/admin/components/form/AdminToggle";
import { useContentCollection } from "@/admin/hooks/useContentCollection";
import { uploadImageFile, storageConfigured } from "@/admin/lib/storage";
import { GalleryItemContent, NormalizedContentItem } from "@/admin/types/content";
import { defaultGallerySeedItems } from "@/data/cms-defaults";

const categories = ["Blackwork", "Realism", "Fine Line", "Traditional", "Custom"];

type GalleryFormState = {
  title: string;
  category: string;
  alt: string;
  imageUrl: string;
  order: string;
  featured: boolean;
};

const emptyForm: GalleryFormState = {
  title: "",
  category: categories[0],
  alt: "",
  imageUrl: "",
  order: "0",
  featured: false,
};

export function GalleryManagementPage() {
  const { items, loading, error, firestoreConfigured, busyId, createItem, updateItem, deleteItem } =
    useContentCollection<GalleryItemContent>("galleryItems");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NormalizedContentItem<GalleryItemContent> | null>(null);
  const [form, setForm] = useState<GalleryFormState>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const filteredItems = useMemo(() => {
    const term = search.toLowerCase().trim();
    return items.filter((item) => {
      const matchesSearch =
        term.length === 0 ||
        [item.title, item.category, item.alt].some((value) => value.toLowerCase().includes(term));
      const matchesCategory = category === "all" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, items, search]);

  const missingDefaultItems = useMemo(
    () =>
      defaultGallerySeedItems.filter(
        (seed) =>
          !items.some(
            (item) =>
              item.imageUrl === seed.imageUrl ||
              (item.title.trim().toLowerCase() === seed.title.trim().toLowerCase() &&
                item.category.trim().toLowerCase() === seed.category.trim().toLowerCase()),
          ),
      ),
    [items],
  );

  const stats = [
    {
      title: "Gallery items",
      value: String(items.length).padStart(2, "0"),
      helper: "Portfolio pieces currently managed in Firestore.",
      icon: Images,
    },
    {
      title: "Featured",
      value: String(items.filter((item) => item.featured).length).padStart(2, "0"),
      helper: "Items highlighted for premium placement or future homepage use.",
      icon: Star,
    },
    {
      title: "Categories",
      value: String(new Set(items.map((item) => item.category)).size).padStart(2, "0"),
      helper: "Distinct tattoo styles currently represented in the gallery.",
      icon: Layers3,
    },
    {
      title: "Ready to upload",
      value: storageConfigured ? "YES" : "NO",
      helper: "Firebase Storage powers direct image upload when configured.",
      icon: ImagePlus,
    },
  ];

  const resetEditor = () => {
    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setSubmitError(null);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setSubmitError(null);
    setOpen(true);
  };

  const openEdit = (item: NormalizedContentItem<GalleryItemContent>) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category,
      alt: item.alt,
      imageUrl: item.imageUrl,
      order: String(item.order ?? 0),
      featured: Boolean(item.featured),
    });
    setFile(null);
    setSubmitError(null);
    setOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      let imageUrl = form.imageUrl.trim();

      if (file) {
        imageUrl = await uploadImageFile(file, "gallery");
      }

      if (!imageUrl) {
        throw new Error("Add an image URL or upload an image before saving the gallery item.");
      }

      const payload = {
        title: form.title.trim(),
        category: form.category,
        alt: form.alt.trim() || form.title.trim(),
        imageUrl,
        order: Number(form.order) || 0,
        featured: form.featured,
      };

      if (editing) {
        await updateItem(editing.id, payload);
      } else {
        await createItem(payload as Omit<GalleryItemContent, "id">);
      }

      resetEditor();
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Unable to save gallery item.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: NormalizedContentItem<GalleryItemContent>) => {
    if (!window.confirm(`Delete gallery item \"${item.title}\"? This action cannot be undone.`)) {
      return;
    }

    await deleteItem(item.id);
  };

  const handleImportDefaults = async () => {
    setSeeding(true);
    setSubmitError(null);

    try {
      if (missingDefaultItems.length === 0) {
        setSubmitError("All current website gallery images are already available in the dashboard.");
        return;
      }

      for (const item of missingDefaultItems) {
        await createItem(item);
      }
    } catch (caught) {
      setSubmitError(
        caught instanceof Error ? caught.message : "Unable to import the current website gallery.",
      );
    } finally {
      setSeeding(false);
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
            <p className="eyebrow">Firebase Storage + Firestore</p>
            <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
              Gallery Manager
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Upload portfolio imagery to Firebase Storage, keep metadata in Firestore, and curate the collection with search, category filters, and editing controls.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => void handleImportDefaults()}
              disabled={seeding || missingDefaultItems.length === 0}
            >
              {seeding
                ? "Importing..."
                : missingDefaultItems.length === 0
                  ? "Website Gallery Imported"
                  : `Import Website Gallery (${missingDefaultItems.length})`}
            </Button>
            <Button onClick={openCreate}>Add Gallery Item</Button>
          </div>
        </div>

        {submitError ? (
          <div className="mt-6 rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
            {submitError}
          </div>
        ) : null}

        {!firestoreConfigured ? (
          <EmptyState
            title="Connect Firebase first"
            description="Add your Firebase environment variables before using the gallery manager. Firestore stores metadata and Firebase Storage handles uploads."
            className="mt-6 rounded-[1.5rem]"
          />
        ) : loading ? (
          <div className="mt-6 flex min-h-[14rem] items-center justify-center">
            <LoadingSpinner label="Loading gallery items" />
          </div>
        ) : error ? (
          <EmptyState title="Unable to load gallery items" description={error} className="mt-6 rounded-[1.5rem]" />
        ) : (
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.45fr_auto]">
              <AdminTextInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, category, or alt text"
              />
              <AdminSelect value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </AdminSelect>
              <Button variant="ghost" onClick={() => { setSearch(""); setCategory("all"); }}>
                Reset
              </Button>
            </div>

            {filteredItems.length === 0 ? (
              <EmptyState
                title={items.length === 0 ? "Import the current website gallery" : "No gallery items found"}
                description={
                  items.length === 0
                    ? "The website still has default gallery images in code. Import them once here so you can edit, replace, or delete them from the dashboard."
                    : "Try another search term or add your first portfolio piece."
                }
                className="rounded-[1.5rem]"
                action={
                  items.length === 0 ? (
                    <Button onClick={() => void handleImportDefaults()} disabled={seeding}>
                      {seeding ? "Importing..." : "Import Current Website Gallery"}
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909]">
                    <img src={item.imageUrl} alt={item.alt || item.title} className="h-64 w-full object-cover" />
                    <div className="space-y-4 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-[0.64rem] uppercase tracking-[0.28em] text-accentMuted">{item.category}</p>
                          <h4 className="mt-3 font-display text-4xl uppercase leading-none text-bone">{item.title}</h4>
                        </div>
                        {item.featured ? (
                          <span className="rounded-full border border-accentMuted/40 bg-accentMuted/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-bone">
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <div className="text-sm leading-7 text-muted">
                        <p>Order: {item.order ?? 0}</p>
                        <p>Added: {item.createdAtLabel}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" onClick={() => openEdit(item)}>
                          Edit
                        </Button>
                        <Button variant="ghost" onClick={() => void handleDelete(item)} disabled={busyId === item.id}>
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
        title={editing ? "Edit Gallery Item" : "Add Gallery Item"}
        subtitle="Gallery metadata"
      >
        <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminField label="Title">
              <AdminTextInput
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Serpent Veil"
                required
              />
            </AdminField>
            <AdminField label="Category">
              <AdminSelect
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Alt text">
              <AdminTextInput
                value={form.alt}
                onChange={(event) => setForm((current) => ({ ...current, alt: event.target.value }))}
                placeholder="Blackwork forearm tattoo detail"
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

          <AdminField label="Image URL" hint="Paste a hosted URL or upload a file below.">
            <AdminTextInput
              value={form.imageUrl}
              onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
              placeholder="https://..."
            />
          </AdminField>

          <AdminField label="Upload image" hint={storageConfigured ? "Upload replaces the image URL on save." : "Firebase Storage is not configured, so upload is unavailable right now."}>
            <AdminTextInput
              type="file"
              accept="image/*"
              disabled={!storageConfigured}
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </AdminField>

          <AdminToggle
            checked={form.featured}
            onChange={(next) => setForm((current) => ({ ...current, featured: next }))}
            label="Feature this gallery item"
          />

          {submitError ? (
            <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
              {submitError}
            </div>
          ) : null}

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={resetEditor}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <LoadingSpinner label="Saving" /> : editing ? "Update Item" : "Create Item"}
            </Button>
          </div>
        </form>
      </EditorModal>
    </div>
  );
}
