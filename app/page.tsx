import { Navbar } from "@/components/layout";
import { Hero, Results, Concept } from "@/components/sections";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Results />
        <Concept />
      </main>
    </SmoothScroll>
  );
}
