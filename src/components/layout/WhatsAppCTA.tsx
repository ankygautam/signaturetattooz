import { MessageCircle } from "lucide-react";

const whatsappHref =
  "https://wa.me/919878228917?text=Hi%20Signature%20Tattooz%2C%20I%20want%20to%20book%20on%20WhatsApp.";

export function WhatsAppCTA() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-[90] inline-flex items-center gap-1.5 rounded-full border border-[#1ea952] bg-[#25D366] px-2.5 py-2 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-[#06110b] shadow-[0_14px_30px_rgba(37,211,102,0.22)] transition hover:-translate-y-0.5 hover:bg-[#20bd5b] sm:hidden"
      aria-label="Book on WhatsApp"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0f7f38] text-white">
        <MessageCircle className="h-3 w-3" />
      </span>
      <span className="whitespace-nowrap">Book on WhatsApp</span>
    </a>
  );
}
