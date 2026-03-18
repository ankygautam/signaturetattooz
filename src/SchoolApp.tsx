import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TattooSchool } from "@/components/sections/TattooSchool";

function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grain opacity-70" />
    </>
  );
}

export default function SchoolApp() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-bone">
      <Atmosphere />
      <Navbar page="school" />
      <main className="pt-24">
        <TattooSchool />
      </main>
      <Footer page="school" />
    </div>
  );
}
