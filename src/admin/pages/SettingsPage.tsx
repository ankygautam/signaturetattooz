import { FormEvent, useMemo, useState } from "react";
import { Globe, Image as ImageIcon, Mail, MapPin, Phone, Share2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatCard } from "@/components/ui/StatCard";
import { AdminField } from "@/admin/components/form/AdminField";
import { AdminTextInput } from "@/admin/components/form/AdminTextInput";
import { AdminTextarea } from "@/admin/components/form/AdminTextarea";
import { useSingletonDocument } from "@/admin/hooks/useSingletonDocument";
import { SiteVisuals, StudioSettings } from "@/admin/types/content";
import { defaultSiteVisuals } from "@/data/cms-defaults";

const defaultStudioSettings: StudioSettings = {
  studioName: "Signature Tattooz",
  website: "signaturetattooz.com",
  ownerName: "Nitin Gautam",
  ownerRole: "Expert Tattooist, Digital Artist",
  location: "Hoshiarpur (PB)",
  email: "hello@signaturetattooz.com",
  phone: "+91 98765 43210",
  brandStatement:
    "Signature Tattooz provides unique and custom work with a focus on quality service, collaboration, comfort, privacy, and a safe sanitary environment.",
  instagram: "https://www.instagram.com/signaturetattooz",
  facebook: "https://www.facebook.com/nitinsignaturetattooz/",
  youtube: "https://www.youtube.com/@signaturetattooz",
};

export function SettingsPage() {
  const { value, setValue, loading, saving, error, firestoreConfigured, save } =
    useSingletonDocument<StudioSettings>("settings", "studio", defaultStudioSettings);
  const {
    value: visuals,
    setValue: setVisuals,
    loading: visualsLoading,
    saving: visualsSaving,
    error: visualsError,
    save: saveVisuals,
  } = useSingletonDocument<SiteVisuals>("cms", "siteVisuals", defaultSiteVisuals);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [visualSubmitError, setVisualSubmitError] = useState<string | null>(null);

  const stats = useMemo(
    () => [
      {
        title: "Studio name",
        value: value.studioName ? "SET" : "MISSING",
        helper: "Primary brand identity shown across admin settings and future public integrations.",
        icon: ShieldCheck,
      },
      {
        title: "Contact info",
        value: value.email && value.phone ? "READY" : "PARTIAL",
        helper: "Email, phone, and location details currently available for studio operations.",
        icon: Phone,
      },
      {
        title: "Social links",
        value: String([value.instagram, value.facebook, value.youtube].filter(Boolean).length).padStart(2, "0"),
        helper: "Connected brand channels managed inside Firestore settings.",
        icon: Share2,
      },
      {
        title: "Website",
        value: value.website ? "LIVE" : "NONE",
        helper: "Primary studio domain used for contact and branding references.",
        icon: Globe,
      },
      {
        title: "Managed visuals",
        value: "05",
        helper: "Hero, about, artist, and booking imagery linked to the website from the dashboard.",
        icon: ImageIcon,
      },
    ],
    [value.email, value.facebook, value.instagram, value.phone, value.studioName, value.website, value.youtube],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    try {
      await save(value);
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Unable to save studio settings.");
    }
  };

  const handleVisualSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVisualSubmitError(null);

    try {
      await saveVisuals(visuals);
    } catch (caught) {
      setVisualSubmitError(caught instanceof Error ? caught.message : "Unable to save website visuals.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {!firestoreConfigured ? (
        <EmptyState
          title="Connect Firestore first"
          description="Add your Firebase environment variables before using studio settings. Once connected, settings save into the settings/studio document."
          className="rounded-[2rem]"
        />
      ) : loading || visualsLoading ? (
        <div className="panel flex min-h-[20rem] items-center justify-center rounded-[2rem]">
          <LoadingSpinner label="Loading studio settings" />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <section className="panel rounded-[2rem] p-6 md:p-8">
            <div className="border-b border-white/10 pb-5">
              <p className="eyebrow">Studio settings</p>
              <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">Contact + Social Controls</h3>
            </div>

            <form className="mt-6 space-y-6" onSubmit={(event) => void handleSubmit(event)}>
              <div className="grid gap-5 md:grid-cols-2">
                <AdminField label="Studio name">
                  <AdminTextInput value={value.studioName} onChange={(event) => setValue({ ...value, studioName: event.target.value })} />
                </AdminField>
                <AdminField label="Website">
                  <AdminTextInput value={value.website} onChange={(event) => setValue({ ...value, website: event.target.value })} />
                </AdminField>
                <AdminField label="Owner / lead artist">
                  <AdminTextInput value={value.ownerName} onChange={(event) => setValue({ ...value, ownerName: event.target.value })} />
                </AdminField>
                <AdminField label="Role">
                  <AdminTextInput value={value.ownerRole} onChange={(event) => setValue({ ...value, ownerRole: event.target.value })} />
                </AdminField>
                <AdminField label="Email">
                  <AdminTextInput value={value.email} onChange={(event) => setValue({ ...value, email: event.target.value })} />
                </AdminField>
                <AdminField label="Phone">
                  <AdminTextInput value={value.phone} onChange={(event) => setValue({ ...value, phone: event.target.value })} />
                </AdminField>
                <AdminField label="Location" className="md:col-span-2">
                  <AdminTextInput value={value.location} onChange={(event) => setValue({ ...value, location: event.target.value })} />
                </AdminField>
                <AdminField label="Instagram">
                  <AdminTextInput value={value.instagram} onChange={(event) => setValue({ ...value, instagram: event.target.value })} />
                </AdminField>
                <AdminField label="Facebook">
                  <AdminTextInput value={value.facebook} onChange={(event) => setValue({ ...value, facebook: event.target.value })} />
                </AdminField>
                <AdminField label="YouTube" className="md:col-span-2">
                  <AdminTextInput value={value.youtube} onChange={(event) => setValue({ ...value, youtube: event.target.value })} />
                </AdminField>
              </div>

              <AdminField label="Brand statement">
                <AdminTextarea value={value.brandStatement} onChange={(event) => setValue({ ...value, brandStatement: event.target.value })} />
              </AdminField>

              {error || submitError ? (
                <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
                  {submitError || error}
                </div>
              ) : null}

              <div className="flex justify-end gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? <LoadingSpinner label="Saving" /> : "Save Settings"}
                </Button>
              </div>
            </form>
          </section>

          <div className="space-y-6">
            <section className="panel rounded-[2rem] p-6 md:p-8">
              <div className="border-b border-white/10 pb-5">
                <p className="eyebrow">Website visuals</p>
                <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
                  Manage Default Images
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  These image links power the main public sections on the website. Update them here
                  and the hero, about, artist, and booking banner visuals update without touching
                  code.
                </p>
              </div>

              <form className="mt-6 space-y-5" onSubmit={(event) => void handleVisualSubmit(event)}>
                <AdminField label="Hero primary image">
                  <AdminTextInput
                    value={visuals.heroPrimaryImage}
                    onChange={(event) => setVisuals({ ...visuals, heroPrimaryImage: event.target.value })}
                    placeholder="https://..."
                  />
                </AdminField>
                <AdminField label="Hero secondary image">
                  <AdminTextInput
                    value={visuals.heroSecondaryImage}
                    onChange={(event) => setVisuals({ ...visuals, heroSecondaryImage: event.target.value })}
                    placeholder="https://..."
                  />
                </AdminField>
                <AdminField label="About image">
                  <AdminTextInput
                    value={visuals.aboutImage}
                    onChange={(event) => setVisuals({ ...visuals, aboutImage: event.target.value })}
                    placeholder="https://..."
                  />
                </AdminField>
                <AdminField label="Artist spotlight image">
                  <AdminTextInput
                    value={visuals.artistImage}
                    onChange={(event) => setVisuals({ ...visuals, artistImage: event.target.value })}
                    placeholder="https://..."
                  />
                </AdminField>
                <AdminField label="Booking banner image">
                  <AdminTextInput
                    value={visuals.bookingBannerImage}
                    onChange={(event) => setVisuals({ ...visuals, bookingBannerImage: event.target.value })}
                    placeholder="https://..."
                  />
                </AdminField>

                {visualsError || visualSubmitError ? (
                  <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
                    {visualSubmitError || visualsError}
                  </div>
                ) : null}

                <div className="flex justify-end gap-3">
                  <Button type="submit" disabled={visualsSaving}>
                    {visualsSaving ? <LoadingSpinner label="Saving" /> : "Save Visuals"}
                  </Button>
                </div>
              </form>
            </section>

            <section className="panel rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">Signature preview</p>
              <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">Studio Identity Snapshot</h3>
              <div className="mt-6 space-y-4 rounded-[1.75rem] border border-white/10 bg-[#0b0b0b] p-6">
                <p className="font-display text-6xl uppercase leading-none text-bone">{value.studioName}</p>
                <p className="text-sm uppercase tracking-[0.28em] text-accentMuted">{value.ownerName} · {value.ownerRole}</p>
                <p className="text-sm leading-7 text-muted">{value.brandStatement}</p>
                <div className="space-y-3 border-t border-white/10 pt-4 text-sm text-muted">
                  <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accentMuted" />{value.location}</p>
                  <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-accentMuted" />{value.email}</p>
                  <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-accentMuted" />{value.phone}</p>
                  <p className="flex items-center gap-3"><Globe className="h-4 w-4 text-accentMuted" />{value.website}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[value.instagram, value.facebook, value.youtube].filter(Boolean).map((link) => (
                    <span key={link} className="rounded-full border border-white/10 px-3 py-1 text-[0.64rem] uppercase tracking-[0.2em] text-muted">
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
