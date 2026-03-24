import whatsappIcon from "@/whatsapp.png";

const whatsappHref =
  "https://wa.me/919878228917?text=Hi%20Signature%20Tattooz%2C%20I%20want%20to%20book%20on%20WhatsApp.";

export function WhatsAppCTA() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-3 right-3 z-[90] inline-flex items-center gap-1 rounded-full border border-[#1ea952] bg-[#25D366] px-2 py-1.5 text-[0.5rem] font-medium uppercase tracking-[0.12em] text-[#06110b] shadow-[0_10px_24px_rgba(37,211,102,0.18)] transition hover:-translate-y-0.5 hover:bg-[#20bd5b] sm:hidden"
      aria-label="Book on WhatsApp"
    >
      <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white">
        <img
          src={whatsappIcon}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
      </span>
      <span className="whitespace-nowrap">Book on WhatsApp</span>
    </a>
  );
}
