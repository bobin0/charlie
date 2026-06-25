import { SiteShell } from "@/components/layout/SiteShell";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StoryScroll } from "@/components/sections/StoryScroll";
import { Experience } from "@/components/sections/Experience";
import { Events } from "@/components/sections/Events";
import { ResidentDJs } from "@/components/sections/ResidentDJs";
import { Gallery } from "@/components/sections/Gallery";
import { VIP } from "@/components/sections/VIP";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <StoryScroll />
      <Experience />
      <Events />
      <ResidentDJs />
      <Gallery />
      <VIP />
      <Stats />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </SiteShell>
  );
}
