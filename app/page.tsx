import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { TimeSaved } from "@/components/sections/TimeSaved";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <TimeSaved />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
