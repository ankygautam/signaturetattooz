import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/admin/providers/AuthProvider";

const loginImage =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, authAvailable } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unable to sign in right now.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-bone">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(141,31,50,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(183,145,96,0.16),transparent_28%)]" />
      <div className="section-shell relative flex min-h-screen items-center py-12">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="relative hidden min-h-[40rem] overflow-hidden rounded-[2rem] border border-white/10 lg:block"
          >
            <img src={loginImage} alt="Signature Tattooz studio" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="eyebrow">Admin access</p>
              <h1 className="mt-4 font-display text-7xl uppercase leading-[0.88] text-bone">
                Studio
                <br />
                Control
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                Manage bookings, inquiries, gallery drops, and Tattoo School content in one focused dashboard.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="panel mx-auto w-full max-w-xl rounded-[2rem] p-8 md:p-10"
          >
            <div className="mb-8">
              <p className="eyebrow">Signature Tattooz Admin</p>
              <h2 className="mt-4 font-display text-6xl uppercase leading-[0.86] text-bone">
                Welcome Back
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
                Sign in with your Firebase-authenticated studio account to access the dashboard shell.
              </p>
            </div>

            {!authAvailable ? (
              <EmptyState
                title="Firebase setup required"
                description="Add your VITE_FIREBASE_* environment variables to a local .env file before using the admin login. Once those values are in place, the login form will become active."
                actionLabel="Back to site"
                actionHref={import.meta.env.BASE_URL}
                className="rounded-[1.5rem] border-accentMuted/20 bg-accentMuted/5"
              />
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                  <span className="text-[0.7rem] uppercase tracking-[0.28em] text-muted">Email</span>
                  <input
                    className="input-shell"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="studio@signaturetattooz.com"
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-[0.7rem] uppercase tracking-[0.28em] text-muted">Password</span>
                  <input
                    className="input-shell"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </label>

                {error ? (
                  <div className="rounded-[1.25rem] border border-[#8d1f32]/40 bg-[#8d1f32]/10 px-4 py-3 text-sm text-bone/90">
                    {error}
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <a
                    href={import.meta.env.BASE_URL}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted transition hover:text-bone"
                  >
                    Back to site
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Button type="submit" size="lg" className="min-w-[11rem]" disabled={submitting}>
                    {submitting ? <LoadingSpinner label="Signing in" /> : (
                      <>
                        <LockKeyhole className="mr-2 h-4 w-4" />
                        Enter Dashboard
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
