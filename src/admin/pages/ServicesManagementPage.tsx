import { FormEvent, useMemo, useState } from "react";
import { BriefcaseBusiness, Layers3, Plus, Type } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";
import { EditorModal } from "@/admin/components/EditorModal";
import { AdminField } from "@/admin/components/form/AdminField";
import { AdminTextInput } from "@/admin/components/form/AdminTextInput";
import { AdminTextarea } from "@/admin/components/form/AdminTextarea";
import { useContentCollection } from "@/admin/hooks/useContentCollection";
import { NormalizedContentItem, ServiceContent } from "@/admin/types/content";

type ServiceFormState = {
  title: string;
  description: string;
  order: string;
};

const emptyForm: ServiceFormState = {
  title: "",
  description: "",
  order: "0",
};

export function ServicesManagementPage() {
  const { items, loading, error, firestoreConfigured, busyId, createItem, updateItem, deleteItem } =
    useContentCollection<ServiceContent>("services");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NormalizedContentItem<ServiceContent> | null>(null);
  const [form, setForm] = useState<ServiceFormState>(emptyForm);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredItems = useMemo(() => {
    const term = search.toLowerCase().trim();
    return items.filter((item) => {
      if (term.length === 0) {
        return true;
      }

      return [item.title, item.description].some((value) => value.toLowerCase().includes(term));
    });
  }, [items, search]);

  const stats = [
    {
      title: "Services",
      value: String(items.length).padStart(2, "0"),
      helper: "Service cards currently managed in Firestore.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Ordered entries",
      value: String(items.filter((item) => typeof item.order === "number").length).padStart(2, "0"),
      helper: "Entries with explicit order values for front-end placement.",
      icon: Layers3,
    },
    {
      title: "Longest copy",
      value: String(Math.max(0, ...items.map((item) => item.description.length))).padStart(2, "0"),
      helper: "Character count on the most detailed current service description.",
      icon: Type,
    },
    {
      title: "Create new",
      value: "+",
      helper: "Add and reorder service offerings without editing code.",
      icon: Plus,
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

  const openEdit = (item: NormalizedContentItem<ServiceContent>) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      order: String(item.order ?? 0),
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
        title: form.title.trim(),
        description: form.description.trim(),
        order: Number(form.order) || 0,
      };

      if (editing) {
        await updateItem(editing.id, payload);
      } else {
        await createItem(payload as Omit<ServiceContent, "id">);
      }

      resetEditor();
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Unable to save service.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: NormalizedContentItem<ServiceContent>) => {
    if (!window.confirm(`Delete service \"${item.title}\"? This action cannot be undone.`)) {
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
              Services Manager
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Add, edit, reorder, and remove service offerings with clean forms and a studio-friendly responsive layout.
            </p>
          </div>
          <Button onClick={openCreate}>Add Service</Button>
        </div>

        {!firestoreConfigured ? (
          <EmptyState title="Connect Firestore first" description="Add your Firebase environment variables before using the services manager." className="mt-6 rounded-[1.5rem]" />
        ) : loading ? (
          <div className="mt-6 flex min-h-[14rem] items-center justify-center">
            <LoadingSpinner label="Loading services" />
          </div>
        ) : error ? (
          <EmptyState title="Unable to load services" description={error} className="mt-6 rounded-[1.5rem]" />
        ) : (
          <div className="mt-6 space-y-6">
            <AdminTextInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search service title or description" />

            {filteredItems.length === 0 ? (
              <EmptyState title="No services found" description="Try another search term or add your first service." className="rounded-[1.5rem]" />
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item, index) => (
                  <article key={item.id} className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-[#090909] p-5 md:grid-cols-[0.14fr_0.38fr_1fr_auto] md:items-start">
                    <p className="text-[0.68rem] uppercase tracking-[0.3em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h4 className="font-display text-4xl uppercase leading-none text-bone">{item.title}</h4>
                    <div className="space-y-3">
                      <p className="text-sm leading-7 text-muted">{item.description}</p>
                      <p className="text-xs uppercase tracking-[0.22em] text-muted">Order: {item.order ?? 0}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 md:justify-end">
                      <Button variant="secondary" onClick={() => openEdit(item)}>
                        Edit
                      </Button>
                      <Button variant="ghost" onClick={() => void handleDelete(item)} disabled={busyId === item.id}>
                        Delete
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <EditorModal open={open} onClose={resetEditor} title={editing ? "Edit Service" : "Add Service"} subtitle="Service content">
        <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminField label="Title">
              <AdminTextInput value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Custom Design" required />
            </AdminField>
            <AdminField label="Order">
              <AdminTextInput type="number" value={form.order} onChange={(event) => setForm((current) => ({ ...current, order: event.target.value }))} />
            </AdminField>
          </div>
          <AdminField label="Description">
            <AdminTextarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Original concepts shaped around your story..." required />
          </AdminField>
          {submitError ? <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">{submitError}</div> : null}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={resetEditor}>Cancel</Button>
            <Button type="submit" disabled={submitting}>{submitting ? <LoadingSpinner label="Saving" /> : editing ? "Update Service" : "Create Service"}</Button>
          </div>
        </form>
      </EditorModal>
    </div>
  );
}
