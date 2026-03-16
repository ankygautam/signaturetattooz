export function Footer() {
  return (
    <footer className="border-t border-stroke/60 bg-black/40 py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.2em] text-bone">signaturetattooz</p>
          <p className="text-sm text-muted">Bespoke tattoo atelier · Edmonton</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a className="hover:text-bone transition-colors" href="mailto:hello@signaturetattooz.com">
            hello@signaturetattooz.com
          </a>
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          <a className="hover:text-bone transition-colors" href="https://instagram.com">
            Instagram
          </a>
          <a className="hover:text-bone transition-colors" href="tel:+17805550111">
            +1 (780) 555-0111
          </a>
        </div>
      </div>
    </footer>
  );
}
