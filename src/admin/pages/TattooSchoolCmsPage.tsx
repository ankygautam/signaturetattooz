import { FormEvent, useMemo, useState } from "react";
import { Eye, GraduationCap, Image as ImageIcon, Library, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";
import { AdminField } from "@/admin/components/form/AdminField";
import { AdminTextInput } from "@/admin/components/form/AdminTextInput";
import { AdminTextarea } from "@/admin/components/form/AdminTextarea";
import { useSingletonDocument } from "@/admin/hooks/useSingletonDocument";
import { SchoolModule, SchoolShot, TattooSchoolContent } from "@/admin/types/content";

const defaultTattooSchoolContent: TattooSchoolContent = {
  eyebrow: "Tattoo School",
  title: "Learn The Art. Build The Discipline. Create With Confidence.",
  description:
    "At Signature Tattooz, Tattoo School is built for aspiring artists who want more than just theory. We focus on the real foundation of tattooing — hygiene, machine knowledge, skin understanding, design flow, stencil placement, needle control, and professional studio practice.",
  paragraphOne:
    "Whether you are just starting out or looking to sharpen your skills, our training is designed to help you grow with proper guidance in a creative studio environment. You will learn the mindset, patience, and technical precision it takes to become a confident tattoo artist.",
  paragraphTwo:
    "This is not just about making tattoos look good. It is about learning how to work safely, professionally, and with purpose.",
  focusTitle: "Training focus",
  focusDescription:
    "Students are trained through observation, guided practice, design correction, technical breakdowns, and repeat discipline. The goal is to help you understand not only what to do, but why it matters inside a real studio workflow.",
  leadImage: "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1400&q=80",
  moduleHeading: "Technique modules",
  moduleTitle: "More Detail. More Technique. More Real Studio Knowledge.",
  shots: [
    {
      title: "Apprentice Practice",
      image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Studio Observation",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Creative Discipline",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    },
  ],
  modules: [
    {
      title: "Shading Control",
      description: "Learn depth, tone building, hand speed, and how smooth transitions are created without muddying the piece.",
    },
    {
      title: "Portrait Realism",
      description: "Understand facial structure, values, reference breakdown, and how realism tattoos hold clarity on skin.",
    },
    {
      title: "Line & Needle Discipline",
      description: "Build confidence with line consistency, stretch, hand angle, and machine movement for cleaner execution.",
    },
  ],
};

function updateShot(items: SchoolShot[], index: number, key: keyof SchoolShot, value: string) {
  return items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item));
}

function updateModule(items: SchoolModule[], index: number, key: keyof SchoolModule, value: string) {
  return items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item));
}

export function TattooSchoolCmsPage() {
  const { value, setValue, loading, saving, error, firestoreConfigured, save } =
    useSingletonDocument<TattooSchoolContent>("cms", "tattooSchool", defaultTattooSchoolContent);
  const [previewMode, setPreviewMode] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const stats = useMemo(
    () => [
      {
        title: "Student shots",
        value: String(value.shots.length).padStart(2, "0"),
        helper: "Studio learning visuals currently shown in the Tattoo School page.",
        icon: ImageIcon,
      },
      {
        title: "Modules",
        value: String(value.modules.length).padStart(2, "0"),
        helper: "Technique modules managed inside the Tattoo School CMS.",
        icon: Library,
      },
      {
        title: "Preview",
        value: previewMode ? "ON" : "OFF",
        helper: "Switch live preview on or off while editing Tattoo School content.",
        icon: Eye,
      },
      {
        title: "School CMS",
        value: "LIVE",
        helper: "Branded editing built specifically for Signature Tattooz training content.",
        icon: GraduationCap,
      },
    ],
    [previewMode, value.modules.length, value.shots.length],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    try {
      await save(value);
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Unable to save Tattoo School content.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {!firestoreConfigured ? (
        <EmptyState
          title="Connect Firestore first"
          description="Add your Firebase environment variables before using the Tattoo School CMS. Once connected, content saves into the cms/tattooSchool document."
          className="rounded-[2rem]"
        />
      ) : loading ? (
        <div className="panel flex min-h-[20rem] items-center justify-center rounded-[2rem]">
          <LoadingSpinner label="Loading Tattoo School CMS" />
        </div>
      ) : (
        <div className="grid gap-6 2xl:grid-cols-[1.05fr_0.95fr]">
          <section className="panel rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="eyebrow">Tattoo School CMS</p>
                <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
                  Edit Training Content
                </h3>
              </div>
              <Button type="button" variant="ghost" onClick={() => setPreviewMode((current) => !current)}>
                {previewMode ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>

            <form className="mt-6 space-y-6" onSubmit={(event) => void handleSubmit(event)}>
              <div className="grid gap-5 md:grid-cols-2">
                <AdminField label="Eyebrow">
                  <AdminTextInput value={value.eyebrow} onChange={(event) => setValue({ ...value, eyebrow: event.target.value })} />
                </AdminField>
                <AdminField label="Lead image URL">
                  <AdminTextInput value={value.leadImage} onChange={(event) => setValue({ ...value, leadImage: event.target.value })} placeholder="https://..." />
                </AdminField>
              </div>

              <AdminField label="Main title">
                <AdminTextarea value={value.title} onChange={(event) => setValue({ ...value, title: event.target.value })} className="min-h-[6rem]" />
              </AdminField>
              <AdminField label="Intro description">
                <AdminTextarea value={value.description} onChange={(event) => setValue({ ...value, description: event.target.value })} />
              </AdminField>
              <AdminField label="Paragraph one">
                <AdminTextarea value={value.paragraphOne} onChange={(event) => setValue({ ...value, paragraphOne: event.target.value })} />
              </AdminField>
              <AdminField label="Paragraph two">
                <AdminTextarea value={value.paragraphTwo} onChange={(event) => setValue({ ...value, paragraphTwo: event.target.value })} />
              </AdminField>

              <div className="grid gap-5 md:grid-cols-2">
                <AdminField label="Focus label">
                  <AdminTextInput value={value.focusTitle} onChange={(event) => setValue({ ...value, focusTitle: event.target.value })} />
                </AdminField>
                <AdminField label="Module label">
                  <AdminTextInput value={value.moduleHeading} onChange={(event) => setValue({ ...value, moduleHeading: event.target.value })} />
                </AdminField>
              </div>

              <AdminField label="Focus description">
                <AdminTextarea value={value.focusDescription} onChange={(event) => setValue({ ...value, focusDescription: event.target.value })} />
              </AdminField>
              <AdminField label="Module title">
                <AdminTextarea value={value.moduleTitle} onChange={(event) => setValue({ ...value, moduleTitle: event.target.value })} className="min-h-[6rem]" />
              </AdminField>

              <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="eyebrow">Student shots</p>
                    <p className="mt-2 text-sm text-muted">Show the studio learning atmosphere with image-and-title pairs.</p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setValue({
                      ...value,
                      shots: [...value.shots, { title: "New shot", image: "" }],
                    })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Shot
                  </Button>
                </div>
                <div className="space-y-4">
                  {value.shots.map((shot, index) => (
                    <div key={`${shot.title}-${index}`} className="grid gap-4 rounded-[1.25rem] border border-white/10 p-4 md:grid-cols-[0.9fr_1.1fr_auto]">
                      <AdminTextInput
                        value={shot.title}
                        onChange={(event) => setValue({ ...value, shots: updateShot(value.shots, index, "title", event.target.value) })}
                        placeholder="Shot title"
                      />
                      <AdminTextInput
                        value={shot.image}
                        onChange={(event) => setValue({ ...value, shots: updateShot(value.shots, index, "image", event.target.value) })}
                        placeholder="Image URL"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setValue({ ...value, shots: value.shots.filter((_, itemIndex) => itemIndex !== index) })}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="eyebrow">Technique modules</p>
                    <p className="mt-2 text-sm text-muted">Keep the training modules current and easy to preview before publishing.</p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setValue({
                      ...value,
                      modules: [...value.modules, { title: "New module", description: "" }],
                    })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Module
                  </Button>
                </div>
                <div className="space-y-4">
                  {value.modules.map((module, index) => (
                    <div key={`${module.title}-${index}`} className="space-y-4 rounded-[1.25rem] border border-white/10 p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                        <AdminTextInput
                          value={module.title}
                          onChange={(event) => setValue({ ...value, modules: updateModule(value.modules, index, "title", event.target.value) })}
                          placeholder="Module title"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setValue({ ...value, modules: value.modules.filter((_, itemIndex) => itemIndex !== index) })}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                      <AdminTextarea
                        value={module.description}
                        onChange={(event) => setValue({ ...value, modules: updateModule(value.modules, index, "description", event.target.value) })}
                        placeholder="Module description"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {error || submitError ? (
                <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
                  {submitError || error}
                </div>
              ) : null}

              <div className="flex justify-end gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? <LoadingSpinner label="Saving" /> : "Save Tattoo School"}
                </Button>
              </div>
            </form>
          </section>

          {previewMode ? (
            <section className="panel rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">Live preview</p>
              <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">Tattoo School Preview</h3>
              <div className="mt-6 space-y-8">
                <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="space-y-5">
                    <p className="eyebrow">{value.eyebrow}</p>
                    <h4 className="font-display text-5xl uppercase leading-[0.88] text-bone">{value.title}</h4>
                    <p className="text-sm leading-8 text-muted">{value.description}</p>
                    <p className="text-sm leading-8 text-muted">{value.paragraphOne}</p>
                    <p className="text-sm leading-8 text-muted">{value.paragraphTwo}</p>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <p className="eyebrow">{value.focusTitle}</p>
                      <p className="mt-3 text-sm leading-8 text-muted">{value.focusDescription}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <img src={value.leadImage} alt="Tattoo School lead" className="h-72 w-full rounded-[1.5rem] object-cover" />
                    <div className="grid gap-4 md:grid-cols-3">
                      {value.shots.map((shot, index) => (
                        <div key={`${shot.title}-${index}`} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0c0c0c]">
                          <img src={shot.image} alt={shot.title} className="h-36 w-full object-cover" />
                          <div className="p-4">
                            <p className="font-display text-2xl uppercase leading-none text-bone">{shot.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="eyebrow">{value.moduleHeading}</p>
                  <h4 className="font-display text-5xl uppercase leading-[0.88] text-bone">{value.moduleTitle}</h4>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {value.modules.map((module, index) => (
                      <div key={`${module.title}-${index}`} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="font-display text-3xl uppercase leading-none text-bone">{module.title}</p>
                        <p className="mt-3 text-sm leading-7 text-muted">{module.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
