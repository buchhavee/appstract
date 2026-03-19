import { Navbar } from "@/components/layout";
import { Hero, Results, Concept, Feature, Cases, Contact, Footer } from "@/components/sections";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <Hero />
        <Results />
        <Concept />
        <Feature />
        <Cases />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
