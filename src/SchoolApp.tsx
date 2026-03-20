import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TattooSchool } from "@/components/sections/TattooSchool";
import { createSiteThemeStyle, pickRandomSitePalette } from "@/lib/site-theme";

function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grain opacity-70" />
    </>
  );
}

export default function SchoolApp() {
  const [palette] = useState(() => pickRandomSitePalette());

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-background text-bone"
      style={createSiteThemeStyle(palette)}
    >
      <Atmosphere />
      <Navbar page="school" />
      <main className="editorial-light relative pt-24">
        <TattooSchool />
      </main>
      <Footer page="school" />
    </div>
  );
}
