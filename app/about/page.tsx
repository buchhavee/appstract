import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { AboutHero, TeamSection, TeamPhoto, AboutCta } from "@/components/sections/about";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "About Us - Appstract",
  description: "Meet the team behind Appstract — building the future of shared shopping experiences.",
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main className="flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <AboutHero />
        <TeamSection />
        <TeamPhoto />
        <AboutCta />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
