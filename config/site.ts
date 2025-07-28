export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SignatureTattooz",
  description: "Unleash your story through ink. Explore stunning designs and book your next tattoo.",
  navItems: [
    {
      label: "Inkspire",
      href: "/",
    },
    {
      label: "Our Process",
      href: "/process",
    },
    {
      label: "Ink Pricing",
      href: "/pricing",
    },
    {
      label: "Stories & Ink",
      href: "/blog",
    },
    {
      label: "Studio Legacy",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "My Ink Profile",
      href: "/profile",
    },
    {
      label: "Studio Dashboard",
      href: "/dashboard",
    },
    {
      label: "My Tattoos",
      href: "/projects",
    },
    {
      label: "Artists",
      href: "/team",
    },
    {
      label: "Booking Schedule",
      href: "/calendar",
    },
    {
      label: "Studio Settings",
      href: "/settings",
    },
    {
      label: "Support",
      href: "/help-feedback",
    },
    {
      label: "Sign Out",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/ankygautam/signaturetattooz",
    twitter: "https://twitter.com/signaturetatts",
    docs: "https://signaturetattooz.com/process",
    discord: "https://discord.gg/signaturetatts",
    sponsor: "https://patreon.com/signaturetatts",
  },
};
