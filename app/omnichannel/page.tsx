import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { OmnichannelHero, KpiBentoGrid, KpiShowcase, OmnichannelCta } from "@/components/sections/omnichannel";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Omnichannel - Appstract",
  description: "Discover how Appstract enables a seamless omnichannel shopping experience across every touchpoint.",
};

export default function OmnichannelPage() {
  return (
    <SmoothScroll>
      <main className="flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <OmnichannelHero />
        <KpiBentoGrid />
        <KpiShowcase />
        <OmnichannelCta />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
