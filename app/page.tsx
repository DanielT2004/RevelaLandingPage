import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { EditStatement } from "@/components/sections/EditStatement";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { NichesSection } from "@/components/sections/NichesSection";
import { TrySwipe } from "@/components/sections/TrySwipe";
import { NicheProvider } from "@/components/niche/NicheContext";
import { Features } from "@/components/sections/Features";
import { TimeSaved } from "@/components/sections/TimeSaved";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ScrollScrubber } from "@/components/visuals/ScrollScrubber";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Client provider with server sections as children — no RSC downgrade. */}
        <NicheProvider>
          <Hero />
          <EditStatement />
          <TrySwipe />
          <ProblemSection />
          <HowItWorks />
          <NichesSection />
          <Features />
          <TimeSaved />
          <SocialProof />
          <FinalCTA />
        </NicheProvider>
      </main>
      <Footer />
      <ScrollScrubber />
    </>
  );
}
