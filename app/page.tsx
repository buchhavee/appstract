import { Navbar } from "@/components/layout";
import { Hero, Results } from "@/components/sections";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Results />
    </main>
  );
}
