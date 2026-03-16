import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Portfolio } from "./components/sections/Portfolio";
import { Artists } from "./components/sections/Artists";
import { Experience } from "./components/sections/Experience";
import { Booking } from "./components/sections/Booking";

function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-accent/6 via-transparent to-accentMuted/8" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-grain opacity-60" />
    </>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-bone">
      <Atmosphere />
      <Navbar />
      <main className="space-y-8">
        <Hero />
        <Portfolio />
        <Artists />
        <Experience />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
