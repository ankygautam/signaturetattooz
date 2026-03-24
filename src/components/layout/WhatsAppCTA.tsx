import whatsappIcon from "@/whatsapp.png";

const whatsappHref =
  "https://wa.me/919878228917?text=Hi%20Signature%20Tattooz%2C%20I%20want%20to%20book%20on%20WhatsApp.";

export function WhatsAppCTA() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-3 right-3 z-[90] inline-flex items-center justify-center rounded-full border border-[#1ea952] bg-[#25D366] p-2 shadow-[0_12px_28px_rgba(37,211,102,0.2)] transition hover:-translate-y-0.5 hover:bg-[#20bd5b] sm:hidden"
      aria-label="Book on WhatsApp"
    >
      <span className="inline-flex h-6 w-6 flex-none items-center justify-center">
        <img
          src={whatsappIcon}
          alt=""
          className="h-full w-full object-contain"
          loading="eager"
        />
      </span>
    </a>
  );
}
