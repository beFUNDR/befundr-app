import HeroSection from "@/components/homepage/_HeroSection";
import ProcessSection from "@/components/homepage/_ProcessSection";
import ProjectSection from "@/components/homepage/_ProjectSection";
import PartnerSection from "@/components/homepage/_PartnerSection";
import FaqSection from "@/components/homepage/_FaqSection";
import BottomLabel from "@/components/homepage/BottomLabel";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
      <HeroSection />
      <ProjectSection />
      <ProcessSection />
      <PartnerSection />
      <FaqSection />
      <BottomLabel />
    </div>
  );
}
