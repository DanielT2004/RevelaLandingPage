import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { EditStatement } from "@/components/sections/EditStatement";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { NichesSection } from "@/components/sections/NichesSection";
import { TrySwipe } from "@/components/sections/TrySwipe";
import { NicheProvider } from "@/components/niche/NicheContext";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ScrollScrubber } from "@/components/visuals/ScrollScrubber";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Client provider with server sections as children — no RSC downgrade. */}
        <NicheProvider>
          {/* components/sections/SocialProof.tsx is intentionally not mounted:
              it renders bracketed placeholder testimonials. Drop it back in
              here once there are real, permissioned creator quotes. */}
          <Hero />
          <EditStatement />
          <TrySwipe />
          <HowItWorks />
          <NichesSection />
          <FinalCTA />
        </NicheProvider>
      </main>
      <Footer />
      <ScrollScrubber />
    </>
  );
}
