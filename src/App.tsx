import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { ArtistSpotlight } from "@/components/sections/ArtistSpotlight";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Values } from "@/components/sections/Values";
import { createSiteThemeStyle, pickRandomSitePalette } from "@/lib/site-theme";

function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grain opacity-70" />
    </>
  );
}

export default function App() {
  const [palette] = useState(() => pickRandomSitePalette());

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-background text-bone"
      style={createSiteThemeStyle(palette)}
    >
      <Atmosphere />
      <Navbar page="home" />
      <main>
        <Hero />
        <div className="editorial-light relative">
          <About />
          <Services />
          <Gallery />
          <ArtistSpotlight />
          <Values />
          <Testimonials />
          <BookingCTA />
          <Contact />
        </div>
      </main>
      <Footer page="home" />
    </div>
  );
}
